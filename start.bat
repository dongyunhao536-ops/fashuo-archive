@"
@echo off
D:
cd D:\fashuo
echo.
echo ===== fashuo - Claude Code =====
echo  输入 /init   : 初始化项目记忆
echo  输入 /memory : 查看长期记忆
echo  直接输问题   : AI 会读取资料回答
echo.
claude
"@ | Out-File -FilePath "D:\fashuo\start.bat" -Encoding ASCII