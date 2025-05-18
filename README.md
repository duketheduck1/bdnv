# Bahamut Name Service (BNS)

![BNS Logo](https://via.placeholder.com/150x150.png?text=BNS)

## Overview

Bahamut Name Service (BNS) is a decentralized domain name system built on the Bahamut blockchain. It allows users to register `.ftn` domains by locking FTN tokens into a 12-month renewable staking contract. Unlike traditional domain registration services, BNS provides users with staking rewards while their domains appreciate in value over time.

## Key Features

- **Staking-Based Registration**: Register domains by locking FTN tokens for 12 months
- **Yield Generation**: Earn staking rewards on locked tokens
- **Domain Value Appreciation**: Domains increase in value over time
- **Validator Node Integration**: Staking pool launches new validator nodes when threshold is reached
- **Comprehensive Record Management**: Set addresses, content hashes, and additional metadata
- **DeFi Integration**: Tokens are routed to DeFi staking strategies when below validator threshold

## Project Architecture

### Smart Contracts

The BNS system is built on three core smart contracts:

1. **BNSRegistrar**: Handles domain registration, renewal, and token locking
   - Calculates domain costs based on length and popularity
   - Manages 12-month staking contracts
   - Handles domain expiration and reclamation

2. **BNSResolver**: Maps registered names to Bahamut addresses and other records
   - Resolves domain names to addresses (forward resolution)
   - Resolves addresses to domain names (reverse lookup)
   - Manages additional records (email, website, social media, etc.)

3. **StakingProxy**: Manages the staking pool and validator node creation
   - Routes tokens to DeFi strategies when below 8000 FTN
   - Launches new validator nodes when threshold is reached
   - Distributes staking rewards to domain owners

### Frontend Architecture

The BNS frontend is built with Next.js and follows a modern React architecture:

```
/app                  # Next.js app directory
  /dashboard          # Dashboard page for managing domains
  /page.tsx           # Landing page
/components           # Reusable UI components
  /ui                 # Shadcn UI components
  /domain-card.tsx    # Domain display and management
  /wallet-info.tsx    # Wallet connection and balance
/hooks                # Custom React hooks
/lib                  # Utility functions
/store                # State management
/types                # TypeScript type definitions
```

## Technologies Used

### Frontend

- **Next.js**: React framework for server-rendered applications
- **React**: UI library for building component-based interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Component library built on Radix UI
- **Framer Motion**: Animation library for React
- **Recharts**: Composable charting library for React
- **Lucide React**: Icon library

### Blockchain Integration

- **Wagmi**: React hooks for Ethereum
- **Ethers.js**: Library for interacting with the Ethereum blockchain
- **Privy**: Authentication and wallet connection

### Development Tools

- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **pnpm**: Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bahamut-name-service.git
cd bahamut-name-service

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Bahamut Network Configuration
NEXT_PUBLIC_BAHAMUT_RPC_URL=https://rpc.bahamut.network
NEXT_PUBLIC_REGISTRAR_CONTRACT=0x...
NEXT_PUBLIC_RESOLVER_CONTRACT=0x...
NEXT_PUBLIC_STAKING_CONTRACT=0x...

# Privy Authentication
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
NEXT_PUBLIC_PRIVY_CLIENT_ID=your-privy-client-id
```

You can obtain Privy credentials by signing up at [privy.io](https://privy.io) and creating a new application.

## Usage

1. **Connect Wallet**: Connect your Bahamut-compatible wallet
2. **Search Domains**: Search for available `.ftn` domains
3. **Register Domain**: Lock FTN tokens to register a domain for 12 months
4. **Manage Records**: Set address, content hash, and other records
5. **Monitor Rewards**: Track staking rewards and domain value appreciation
6. **Renew Domains**: Extend domain registration before expiration

## Roadmap

### Phase 1 (MVP)
- Basic domain registration and resolution
- Staking-based registration model
- Simple web interface

### Phase 2
- Domain bidding/auction logic
- Enhanced resolver capabilities
- Metadata and ownership utilities

### Phase 3
- Staking optimization
- Governance and decentralization
- Advanced features and integrations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Bahamut Network for blockchain infrastructure
- ENS for inspiration and best practices in decentralized naming
