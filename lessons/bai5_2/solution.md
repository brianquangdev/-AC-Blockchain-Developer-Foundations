# Bài 5.2 - Hướng dẫn Deploy Smart Contract với Hardhat + Ethers.js

## 🎯 Mục tiêu

- Deploy smart contract đơn giản bằng Hardhat
- Gọi hàm `increment()` từ contract bằng Ethers.js
- In kết quả của `getCount()` ra console

## 📋 Các bước thực hiện

### 1. Clone Hardhat Template

```bash
git clone https://github.com/appscyclone/ac-hardhat-template
cd ac-hardhat-template
npm install
```

### 2. Smart Contract Counter

Tạo file `contracts/Counter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count = 0;

    function increment() public {
        count++;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
```

### 3. Deploy Script

File `deploy/1-deploy.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 4. Test Script

File `scripts/test.ts`:

```typescript
import { ethers } from "hardhat";

async function main() {
  // Lấy contract đã deploy
  const counterAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const Counter = await ethers.getContractFactory("Counter");
  const counter = Counter.attach(counterAddress);

  // Gọi hàm increment
  const tx = await counter.increment();
  await tx.wait();

  // Lấy kết quả
  const count = await counter.getCount();
  console.log("Count after increment:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 5. Unit Test

File `test/Counter.test.ts`:

```typescript
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("Counter", function () {
  let counter: Contract;

  beforeEach(async function () {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
  });

  it("Should start with count 0", async function () {
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should increment count", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });
});
```

## 🚀 Chạy và Test

### 1. Chạy Unit Test

```bash
npx hardhat test
```

### 2. Deploy lên Sepolia Network

```bash
npx hardhat deploy --network sepolia --tags deploy
```

### 3. Chạy Test Script

```bash
npx hardhat run scripts/test.ts --network sepolia
```

## 📝 Kết quả mong đợi

- Unit test pass
- Contract deploy thành công trên Sepolia
- Console hiển thị số `1` sau khi gọi `increment()`

## 🔧 Cấu hình Network

Đảm bảo đã cấu hình private key và RPC URL trong `hardhat.config.ts`:

```typescript
module.exports = {
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
```
