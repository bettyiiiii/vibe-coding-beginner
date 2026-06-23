# 🚀 GitHub 仓库完整配置指南

本指南将帮助你完成 `vibe-coding-beginner` 仓库的所有配置。

---

## ✅ 已完成的配置

| 配置项 | 状态 | 说明 |
|--------|------|------|
| ✓ SSH 密钥生成 | 完成 | 密钥位置：`~/.ssh/github_id_ed25519` |
| ✓ Git 用户信息配置 | 完成 | 用户名：`xiaoru`，邮箱：`xiaoru@example.com` |
| ✓ 本地仓库初始化 | 完成 | 已提交 74 个文件，15771 行代码 |
| ✓ GitHub Actions 工作流 | 完成 | CI/CD 流水线已创建 |
| ✓ Issue 模板 | 完成 | Bug 报告、功能请求、文档改进 |
| ✓ Pull Request 模板 | 完成 | PR 描述模板已创建 |

---

## 🔐 立即行动：添加 SSH 密钥到 GitHub

**这是推送代码的前置条件！**

### 步骤1：复制 SSH 公钥

**公钥内容**（全选并复制）：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOnfdJS8ooAN5Pan18/EjQl/tAqRicMUy14SqkSbhGec xiaoru@example.com
```

或者运行以下命令复制：
```bash
cat ~/.ssh/github_id_ed25519.pub | clip
```

### 步骤2：在 GitHub 添加 SSH 密钥

1. 访问：https://github.com/settings/keys
2. 点击 **New SSH key**
3. 填写信息：
   - **Title**：`workforme-pc`
   - **Key type**：`Authentication Key`
   - **Key**：粘贴上面的公钥
4. 点击 **Add SSH key**

### 步骤3：测试 SSH 连接

```bash
ssh -T git@github.com
```

**预期输出**：
```
Hi bettyiiii! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 🚀 推送代码到 GitHub

**在添加 SSH 密钥后，运行**：

```bash
cd C:\Users\xiaoru\Desktop\workforme\vibe-coding-beginner
git push -u origin main
```

**预期输出**：
```
Enumerating objects: 95, done.
Counting objects: 100% (95/95), done.
Delta compression using up to 8 threads
Compressing objects: 100% (95/95), done.
Writing objects: 100% (95/95), 157.71 KiB | 5.2 MiB/s, done.
Total 95 (delta 12), reused 0 (delta 0)
To github.com:bettyiiii/vibe-coding-beginner.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

---

## 🔒 设置分支保护规则

### 方法A：通过 GitHub Web UI（推荐）

1. 访问仓库：https://github.com/bettyiiii/vibe-coding-beginner/settings/branches
2. 点击 **Add branch protection rule**
3. 填写配置：

| 设置项 | 值 | 说明 |
|--------|-----|------|
| Branch name pattern | `main` | 保护 main 分支 |
| ✓ Restrict pushes that create files greater than 100MB | 勾选 | 防止大文件 |
| ✓ Require a pull request before merging | 勾选 | 禁止直接推送 |
| ✓ Require approvals | 勾选，设置 1 | 至少 1 个审查通过 |
| ✓ Dismiss stale reviews when new commits are pushed | 勾选 | 新提交需重新审查 |
| ✓ Require status checks to pass before merging | 勾选 | 必须通过 CI |
| ✓ Require linear history | 勾选 | 保持提交历史清晰 |
| ✓ Include administrators | 勾选 | 管理员也需遵守规则 |
| ✓ Restrict who can push to the branch | 勾选 | 限制推送权限 |

4. 点击 **Create**

### 方法B：通过 GitHub API（需要 Personal Access Token）

```bash
curl -X PUT \
  -H "Authorization: token YOUR_PERSONAL_ACCESS_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/bettyiiii/vibe-coding-beginner/branches/main/protection \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["build-and-test"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": {
      "required_approving_review_count": 1
    },
    "restrict_pushes": true,
    "restrict_dismissals": true
  }'
```

---

## 👥 添加协作者

### 步骤1：邀请协作者

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/access
2. 点击 **Add people**
3. 输入协作者的 GitHub 用户名或邮箱
4. 选择角色：
   - **Admin**：完全访问权限
   - **Write**：可以推送代码
   - **Read**：只能查看
5. 点击 **Add [username] to this repository**

### 步骤2：设置协作者权限

| 角色 | 权限 |
|------|------|
| **Admin** | 可以管理仓库、设置、协作者、合并 PR |
| **Maintain** | 可以管理 issues、PRs，但不能推送代码 |
| **Write** | 可以推送代码、创建分支、提交 PR |
| **Triage** | 可以管理 issues 和 PRs，但不能写代码 |
| **Read** | 只能查看和克隆 |

---

## 🔗 配置 Webhooks

### 步骤1：添加 Webhook

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/hooks
2. 点击 **Add webhook**
3. 填写配置：

| 字段 | 值 | 说明 |
|------|-----|------|
| Payload URL | `https://your-server.com/webhook` | 接收事件的服务器地址 |
| Content type | `application/json` | 推荐 |
| Secret | `[生成一个随机字符串]` | 用于验证请求 |
| SSL verification | 勾选 | 启用 SSL 验证 |
| Which events would you like to trigger this webhook? | 选择事件 | 见下方推荐配置 |
| Active | 勾选 | 启用 webhook |

### 推荐事件配置

| 事件类型 | 触发场景 | 用途 |
|----------|----------|------|
| ✓ Push events | 代码推送 | 触发 CI/CD |
| ✓ Pull request | PR 创建/更新/合并 | 通知团队 |
| ✓ Issues | Issue 创建/关闭 | 任务管理 |
| ✓ Issue comment | Issue 评论 | 团队协作 |
| ✓ Pull request review | PR 审查 | 代码质量 |
| ✓ Stars | 仓库被 star | 社区反馈 |

### 步骤2：测试 Webhook

1. 点击 **Recent Deliveries**
2. 查看发送记录和响应状态
3. 如果失败，检查 Payload URL 是否可访问

---

## 🌐 设置仓库可见性

### 当前状态
- **可见性**：Public（公开）
- **建议**：保持 Public（开源项目更容易获得贡献）

### 如果需要改为 Private（私有）

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings
2. 滚动到 **Danger Zone**
3. 点击 **Change visibility**
4. 选择 **Make private**
5. 输入仓库名称确认

---

## ⚙️ 启用/禁用仓库功能

### 访问设置页面

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings
2. 在 **Features** 区域配置：

| 功能 | 推荐设置 | 说明 |
|------|------------|------|
| ✓ Wikis | 勾选 | 启用 Wiki 文档 |
| ✓ Restrict editing to collaborators only | 勾选 | 限制 Wiki 编辑 |
| ✓ Issues | 勾选 | 启用 Issue 跟踪 |
| ✓ Sponsorships | 勾选（如果有） | 接受赞助 |
| ✓ Preserve this repo's issues and pull requests in the README | 勾选 | 在 README 显示统计 |
| ✓ Projects | 勾选 | 启用项目管理 |
| ✓ Discussions | 勾选 | 启用讨论区 |
| ✓ Allow merge commits | 勾选 | 允许合并提交 |
| ✓ Allow squash merging | 勾选 | 允许 Squash 合并 |
| ✓ Allow rebase merging | 勾选 | 允许 Rebase 合并 |
| ✓ Always suggest updating pull request branches | 勾选 | 建议更新 PR 分支 |
| ✓ Allow auto-merge | 勾选 | 允许自动合并 |
| ✓ Automatically delete head branches | 勾选 | 合并后自动删除分支 |

---

## 🤖 配置 GitHub Actions 密钥

### 如果需要自动部署到 Netlify

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/secrets/actions
2. 点击 **New repository secret**
3. 添加以下密钥：

| Secret 名称 | 值 | 说明 |
|---------------|-----|------|
| `NETLIFY_AUTH_TOKEN` | `[你的 Netlify Token]` | Netlify 认证令牌 |
| `NETLIFY_SITE_ID` | `[你的 Netlify Site ID]` | Netlify 站点 ID |

### 获取 Netlify Token

1. 访问：https://app.netlify.com/user/applications
2. 点击 **New access token**
3. 输入名称：`github-actions-deploy`
4. 复制生成的 Token

### 获取 Netlify Site ID

1. 访问：https://app.netlify.com/sites
2. 选择你的站点
3. 进入 **Site settings** → **General**
4. 复制 **Site ID**

---

## 📊 启用 GitHub Pages（可选）

如果你想在 GitHub 上直接托管网站：

1. 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/pages
2. 在 **Build and deployment** → **Branch** 选择：
   - Branch: `main`
   - Folder: `/docs` 或 `/dist`（需要构建后推送到仓库）
3. 点击 **Save**

**注意**：对于 React SPA 项目，推荐使用 **Netlify** 或 **Vercel** 托管，而不是 GitHub Pages。

---

## ✅ 验证清单

完成所有配置后，运行以下检查：

```bash
# 1. 检查 SSH 连接
ssh -T git@github.com

# 2. 检查远程仓库
cd C:\Users\xiaoru\Desktop\workforme\vibe-coding-beginner
git remote -v

# 3. 推送代码
git push -u origin main

# 4. 检查 GitHub Actions
# 访问：https://github.com/bettyiiii/vibe-coding-beginner/actions

# 5. 检查分支保护
# 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/branches

# 6. 检查 Webhooks
# 访问：https://github.com/bettyiiii/vibe-coding-beginner/settings/hooks
```

---

## 🆘 常见问题

### Q1: SSH 连接失败

**错误信息**：`Permission denied (publickey)`

**解决方案**：
1. 确认 SSH 密钥已添加到 GitHub
2. 确认使用正确的 SSH 密钥：
   ```bash
   ssh -i ~/.ssh/github_id_ed25519 -T git@github.com
   ```
3. 如果仍失败，使用 HTTPS 方式：
   ```bash
   git remote set-url origin https://github.com/bettyiiii/vibe-coding-beginner.git
   git push -u origin main
   # 输入 GitHub 用户名和密码（Personal Access Token）
   ```

### Q2: 推送被分支保护规则阻止

**错误信息**：`protected branch hook declined`

**解决方案**：
1. 创建新分支：
   ```bash
   git checkout -b feature/update-content
   git push -u origin feature/update-content
   ```
2. 在 GitHub 创建 Pull Request
3. 等待审查通过后合并

### Q3: GitHub Actions 构建失败

**检查清单**：
1. 检查 `package.json` 中的 `build` 脚本是否存在
2. 检查 Node.js 版本是否匹配
3. 查看 Actions 日志：https://github.com/bettyiiii/vibe-coding-beginner/actions

---

## 📞 需要帮助？

如果你在配置过程中遇到问题：

1. **查看 GitHub 文档**：https://docs.github.com/
2. **检查仓库 Settings**：https://github.com/bettyiiii/vibe-coding-beginner/settings
3. **查看 GitHub Community Forum**：https://github.community/

---

**配置完成后，你的仓库将具备：**
- ✅ 安全的 SSH 连接
- ✅ 严格的分支保护规则
- ✅ 自动化 CI/CD 流水线
- ✅ 规范的 Issue 和 PR 模板
- ✅ Webhook 自动化通知
- ✅ 合理的协作者权限管理

🎉 **恭喜！你的 GitHub 仓库已完全配置好！**
