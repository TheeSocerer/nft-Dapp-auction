const { ethers } = require("hardhat");

async function main () {
    
    const ContractERC1155 = await ethers.getContractFactory("contractERC1155");

    const ContractERC721Deployed = await ContractERC1155.deploy();

    await ContractERC721Deployed.waitForDeployment(); 

    console.log("Deployed contract to: ", ContractERC721Deployed.target);
}
main()
    .catch((error) => {console.error(error)
        process.exit(1);
    });