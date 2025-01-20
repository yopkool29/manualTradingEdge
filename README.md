# ManualEdge - Futures Trading Backtesting Platform

ManualEdge is a backtesting platform designed specifically for futures market trading strategies. This tool allows traders to analyze and validate their trading strategies using historical market data. Initially used on Renko charts, it has since expanded to support other market data sources.

## Features

- Manual Backtesting for futures trading strategies but can be used for other markets
- Historical data management for various futures indices
- Trade list management for analysis
- Interactive web interface for easy strategy testing

## Prerequisites

- Node.js (v18 or higher)
- Docker (optional, for containerized deployment)

## Installation

### Standard Installation

1. Clone the repository:
```bash
git clone https://github.com/yopkool29/manualTradingEdge.git
cd manualTradingEdge
```

2. Install dependencies:
```bash
npm install
```


3. Start the development server:
```bash
npm run dev
```

### Docker Installation

1. Clone the repository:
```bash
git clone https://github.com/yopkool29/manualTradingEdge.git
cd manualedge
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## Usage

1. Access the web interface through your browser
2. Import your historical futures data
3. Create and configure your trading strategies
4. Run backtests and analyze results
5. View performance metrics and optimize your strategies

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[APACHE 2.0 License](LICENSE)
