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
