# ManualTradingEdge - Futures Trading Backtesting Platform

ManualTradingEdge is a simple backtesting platform designed specifically for futures market trading strategies. This tool allows traders to analyze and validate their trading strategies using historical market data. Initially used on Renko charts, it has since expanded to support other market data sources.

## Features

- Manual Backtesting for futures trading strategies but can be used for other markets
- Historical data management for various futures indices
- Interactive web interface for easy strategy testing

## Prerequisites

- Node.js (v18 or higher)
- pnpm
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
pnpm i
```

3. Environment Variables:
```bash
export DATABASE_URL=file:./dev.db
```

4. Database:
```bash
npx prisma migrate deploy
npx prisma db seed
```

5. Start the development server:
```bash
pnpm run dev
```

### Docker Installation

1. Clone the repository:
```bash
git clone https://github.com/yopkool29/manualTradingEdge.git
cd manualTradingEdge
```

2. Build and run with Docker Compose:
```bash
docker-compose up --build
```

or:

```bash
docker-compose up
```

The application will be available at `http://localhost:3000`

## Usage

1. Access the web interface through your browser
2. Create and configure your trading strategies
3. Enter trades for each list and show results
4. View performance metrics and optimize your strategies

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[APACHE 2.0 License](LICENSE)
