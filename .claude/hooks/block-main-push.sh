#!/bin/bash
# PreToolUse(Bash) hook: git push で main ブランチを対象にした場合だけブロックする。
# 背景・理由は AGENTS.md の「git運用ルール」参照。
# main以外へのpush・pull/fetch/commit等の他のgit操作はブロックしない。

set -euo pipefail

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

# git push を含まないコマンドは即通す
if ! printf '%s' "$cmd" | grep -Eq '(^|[;&|]|&&)[[:space:]]*git[[:space:]]+push([[:space:]]|$)'; then
  exit 0
fi

is_main=0

# 明示的に main が指定されている場合（例: git push origin main / git push origin HEAD:main / git push origin main:main）
if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]:/])main([[:space:]]|$)'; then
  is_main=1
fi

# 明示的なブランチ・refspec指定なしの "git push" / "git push -u origin" / "git push origin" は、
# 現在のブランチがmainのときだけ対象にする
if [ "$is_main" -eq 0 ]; then
  if printf '%s' "$cmd" | grep -Eq '^git[[:space:]]+push([[:space:]]+(-u|--set-upstream|--set-upstream-to=[^[:space:]]+|origin))*[[:space:]]*$'; then
    current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')"
    if [ "$current_branch" = "main" ]; then
      is_main=1
    fi
  fi
fi

if [ "$is_main" -eq 1 ]; then
  reason='main ブランチへの git push は AGENTS.md の運用ルールによりブロックされています。理由: Render は現状ビルドコマンドなしでリポジトリのルートをそのまま配信しており、Render のビルド設定（Build Command=node build.js / Publish Directory=dist）へ切り替える前に main へ push すると、docs/ や AGENTS.md 等の内部ドキュメントが一般公開されてしまいます。main へのマージ・push は、Render 設定切り替えとセットで、必ずユーザーの明示的な合意を得てから実行してください。'
  jq -n --arg reason "$reason" '{
    systemMessage: ("main へのgit pushをブロックしました: " + $reason),
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
fi

exit 0
