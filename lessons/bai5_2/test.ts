import { ethers } from "hardhat";

async function main() {
  // Lấy contract đã deploy (thay YOUR_DEPLOYED_CONTRACT_ADDRESS bằng địa chỉ thực tế)
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
