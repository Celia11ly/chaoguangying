#!/bin/bash

echo "开始构建项目..."
npm run build

echo "构建完成！"

echo ""
echo "请按照以下步骤将项目推送到GitHub并启用GitHub Pages："
echo ""
echo "1. 在GitHub上创建新的仓库"
echo "2. 将本地代码推送到GitHub："
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/你的用户名/潮光影---新视听领域智能体平台战略-3.git"
echo "   git push -u origin main"
echo ""
echo "3. 在GitHub仓库设置中启用GitHub Pages："
echo "   - 进入仓库的 Settings 页面"
echo "   - 选择 Pages 选项"
echo "   - 在 Source 中选择 'GitHub Actions'"
echo ""
echo "4. 推送后GitHub Actions会自动构建并部署到GitHub Pages"
echo "5. 访问地址：https://你的用户名.github.io/潮光影---新视听领域智能体平台战略-3/"