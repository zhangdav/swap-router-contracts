import { ethers } from "hardhat";

const SWAP_ROUTER = "0x81a54D6fdFBcC9053E58BfC54De4a9ff61C94A26";
const TOKEN_IN = "0x643997e67d9aa6951f010A4943ce281e6BD0fD1E";
const TOKEN_OUT = "0x6FA05Db5D82a36d1564f1F3F065ebb52092D8bc8";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer:", signer.address);
  
  // Check and approve token
  const tokenIn = await ethers.getContractAt("IERC20", TOKEN_IN, signer);
  const balance = await tokenIn.balanceOf(signer.address);
  console.log("Token balance:", balance.toString());
  
  const allowance = await tokenIn.allowance(signer.address, SWAP_ROUTER);
  console.log("Current allowance:", allowance.toString());
  

  const approveTx = await tokenIn.approve(SWAP_ROUTER, ethers.constants.MaxUint256);
  await approveTx.wait();
  console.log("Token approved!");
  
  // Execute swap
  const router = await ethers.getContractAt("SwapRouter02", SWAP_ROUTER, signer);
  
  const params = {
    tokenIn: TOKEN_IN,
    tokenOut: TOKEN_OUT,
    fee: 3000,
    recipient: signer.address,
    deadline: Math.floor(Date.now() / 1000) + 300,
    amountIn: "1000000",
    amountOutMinimum: "0",
    sqrtPriceLimitX96: 0
  };

  const tx = await router.exactInputSingle(params, {
    gasLimit: 500000
  });
  
  console.log("Transaction sent:", tx.hash);
  const receipt = await tx.wait();
  console.log("Swap completed! Block:", receipt.blockNumber);
}

main().catch(console.error);
