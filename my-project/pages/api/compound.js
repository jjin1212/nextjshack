const Compound = require('@compound-finance/compound-js')

const cUSDC = Compound.cUSDC
const cETH = Compound.cETH

async function fetchSupplyRateForGivenToken(token) {
    try {
        const cTokenData = await Compound.api.cToken({
            "addresses": Compound.util.getAddress(token)
        });
        return (cTokenData.cToken[0].comp_supply_apy.value * 100).toFixed(2)/100;
    } catch (error) {
        console.error(error);
    }
}

module.exports.fetchSupplyRateForGivenToken = fetchSupplyRateForGivenToken;
export default cETH;
