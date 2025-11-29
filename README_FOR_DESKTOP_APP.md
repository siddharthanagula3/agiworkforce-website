# AGI Workforce Desktop App

> 🚀 **Early Access Alpha** - A free, open-source desktop automation platform built with Tauri, React, and Rust.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)](https://github.com/siddharthanagula3/agiworkforce-desktop-app/releases)
[![Built with Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-1.90+-orange)](https://www.rust-lang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB)](https://reactjs.org/)

## 🎯 Overview

AGI Workforce is a powerful desktop automation platform that enables you to build and execute AI-powered workflows. Combine visual workflow builders, browser automation, desktop UI control, and multi-LLM orchestration to automate your most complex tasks.

### 🌟 Key Features

- **🎨 Visual Workflow Builder**: Drag-and-drop interface for creating complex automation workflows
- **🌐 Browser Automation**: Playwright-powered web automation with headless and visible modes
- **💻 Desktop UI Automation**: Control any Windows application using UI Automation APIs
- **🤖 Multi-LLM Support**: Works with OpenAI, Anthropic, Google, and **free local Ollama models**
- **⚡ High Performance**: Built with Tauri and Rust for native-level performance
- **🔒 Privacy First**: 100% local execution option with Ollama - no data leaves your machine
- **🆓 Free Forever**: MIT licensed, completely free and open source

## 📦 Installation

### Windows (Alpha Available Now)

**System Requirements:**
- Windows 10/11 (64-bit)
- 4 GB RAM (8 GB recommended)
- 500 MB free disk space
- Node.js 20.11.0+ (optional, for development)

**Quick Install:**
1. Download the latest installer from [Releases](https://github.com/siddharthanagula3/agiworkforce-desktop-app/releases)
2. Run `AGIWorkforceSetup.exe`
3. Follow the installation wizard
4. Launch the app

**Or download from our website:**
```bash
https://agiworkforce.com/download
```

### macOS & Linux

Coming Q2 2026. Star this repo to get notified!

## 🚀 Quick Start

### Option 1: Use Free Local LLMs (Recommended for Privacy)

1. **Install Ollama** (100% free, runs locally):
   ```bash
   # Windows
   winget install Ollama.Ollama

   # Or download from: https://ollama.ai
   ```

2. **Pull a model**:
   ```bash
   ollama pull llama3.2
   # or
   ollama pull mistral
   ```

3. **Launch AGI Workforce** and select "Use Ollama" in settings

4. **Start automating!** Describe your task in natural language

### Option 2: Use Cloud LLMs

1. Get API keys from:
   - [OpenAI](https://platform.openai.com/api-keys) (GPT-4, GPT-3.5)
   - [Anthropic](https://console.anthropic.com/) (Claude)
   - [Google AI](https://makersuite.google.com/app/apikey) (Gemini)

2. In AGI Workforce settings, add your API keys

3. Select your preferred model and start automating

## 💡 Usage Examples

### Browser Automation
```typescript
// Navigate to a website, fill a form, and extract data
workflow()
  .browserNavigate("https://example.com")
  .browserFill("#search", "automation")
  .browserClick("#submit")
  .browserExtract(".results")
  .execute()
```

### Desktop Automation
```typescript
// Automate a Windows desktop application
workflow()
  .desktopFindWindow("Calculator")
  .desktopClick("Button[Name='7']")
  .desktopClick("Button[Name='×']")
  .desktopClick("Button[Name='6']")
  .desktopGetText("CalculatorResults")
  .execute()
```

### LLM-Powered Tasks
```typescript
// Let AI handle complex tasks
workflow()
  .llmTask("Read my emails and summarize the important ones")
  .llmTask("Draft a response to the urgent email")
  .execute()
```

## 🛠️ Development

### Prerequisites

- **Node.js** 20.11.0 or higher
- **pnpm** 9.15.3 or higher
- **Rust** 1.90+ (auto-installed by Tauri)
- **Windows** 10/11 (for current development)

### Setup

```bash
# Clone the repository
git clone https://github.com/siddharthanagula3/agiworkforce-desktop-app.git
cd agiworkforce-desktop-app

# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build
```

### Project Structure

```
agiworkforce-desktop-app/
├── src/                    # React frontend
│   ├── components/        # UI components
│   ├── workflows/         # Workflow engine
│   └── integrations/      # LLM & automation integrations
├── src-tauri/             # Rust backend
│   ├── src/              # Rust source code
│   └── Cargo.toml        # Rust dependencies
├── public/               # Static assets
└── package.json          # Node.js dependencies
```

## 🤝 Contributing

We love contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📝 Documentation improvements
- 🔧 Code contributions

Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🗺️ Roadmap

### 🚀 Coming Soon (Q1 2026)
- [ ] Pre-built AI employee library (20+ roles)
- [ ] Workflow marketplace with community templates
- [ ] Real-time ROI dashboard
- [ ] Slack, Teams, WhatsApp integration
- [ ] Parallel agent execution (8+ agents)

### 🔮 Future (Q2+ 2026)
- [ ] macOS and Linux support
- [ ] Hybrid LLM strategy (cost optimization)
- [ ] 3-tier caching system
- [ ] Outcome-based pricing option
- [ ] Enterprise features (SSO, on-premise)

## 📊 Current Status

- ✅ **Core Engine**: Stable
- ✅ **Visual Workflow Builder**: Working
- ✅ **Browser Automation**: Functional
- ✅ **Desktop Automation**: Windows only
- ✅ **Multi-LLM Support**: Active
- 🚧 **AI Employee Library**: In Development
- 🚧 **Marketplace**: Planned
- 🚧 **ROI Dashboard**: Planned

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website**: https://agiworkforce.com
- **Documentation**: https://agiworkforce.com/docs (Coming soon)
- **Discord**: (Coming soon)
- **Twitter**: (Coming soon)

## ⭐ Support

If you find this project useful, please consider:
- Starring the repository ⭐
- Sharing with others who might benefit
- Contributing to the codebase
- Reporting bugs and suggesting features

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [Tauri](https://tauri.app/) - Desktop app framework
- [React](https://reactjs.org/) - UI framework
- [Rust](https://www.rust-lang.org/) - Systems programming language
- [Playwright](https://playwright.dev/) - Browser automation
- [Ollama](https://ollama.ai/) - Local LLM runtime

## 📧 Contact

For questions, issues, or suggestions:
- GitHub Issues: [Create an issue](https://github.com/siddharthanagula3/agiworkforce-desktop-app/issues)
- Email: support@agiworkforce.com (if applicable)

---

**Note**: This is an early access alpha version. Features are actively being developed. Expect bugs and breaking changes. We appreciate your patience and feedback! 🙏
