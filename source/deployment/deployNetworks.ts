#!/usr/bin/env node

import { deployContracts } from "./deployContracts"
import { Configuration } from "../libraries/Configuration";

export async function deployToNetworks(networks: Array<string>) {
    const configurations: Array<Configuration> = networks.map((network) => Configuration.network(network));
    for(let configuration of configurations) {
        console.log(`

-----------------
Deploying to: ${configuration.networkName}
    compiled contracts: ${configuration.contractOutputPath}
    abi: ${configuration.abiOutputPath}
    contract address: ${configuration.contractAddressesOutputPath}
    upload blocks #s: ${configuration.uploadBlockNumbersOutputPath}
`);
        await deployContracts(configuration);
    }
}

if (require.main === module) {
    const networks: Array<string> = process.argv.slice(2);
    deployToNetworks(networks).then(() => {
        console.log("Deployment to all networks succeeded");
        process.exitCode = 0;
    }).catch((error) => {
        console.log("Deployment interrupted with error: ", error);
        process.exitCode = 1;
    });
}
