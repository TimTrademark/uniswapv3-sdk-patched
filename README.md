> Forked from https://github.com/Uniswap/sdks/tree/main/sdks/v3-sdk

# Patched SDK

This repo contains a patch for the uniswapv3 sdk, that allows for partial ticklists (remove the constraint for all ticks to be fetched before quoting).
Check out my [Medium post](https://medium.com/@tim.truyens56/why-calculating-uniswapv3-prices-is-so-hard-for-mev-and-how-to-fix-it-ec74cc7c4fe9) for more info.

# Start using this fork

One can simply call any pool/price related functions within the official SDK to work with this fork. All that has changed is that the constraint for pools to have all ticks pre-fetched is removed. Take the following example:

```
// initialize tickDataProvider
const ticksMapped = myFetchedTicks.map(
      (t) =>
        new Tick({
          index: parseInt(t.index),
          liquidityGross: t.liquidityGross,
          liquidityNet: t.liquidityNet,
        })
    );
const tickDataProvider = new TickListDataProvider(ticksMapped, parseInt(res.tickSpacing));
//calculate output amount
const amountOut = await v3Swap(
    JSBI.BigInt(fee),
    JSBI.BigInt(sqrtPriceX96),
    parseInt(currentTick),
    JSBI.BigInt(currentLiquidity),
    parseInt(tickSpacing),
    tickDataProvider,
    zeroForOne,
    amountSpecified,
    sqrtPriceLimitX96
);

```
