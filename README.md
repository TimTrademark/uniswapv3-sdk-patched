> Forked from https://github.com/Uniswap/sdks/tree/main/sdks/v3-sdk

# Patched SDK

This repo contains a patch for the uniswapv3 sdk, that allows for partial ticklists (remove the constraint for all ticks to be fetched before quoting).
Check out my Medium post for more info.

# Start using this fork

One can simply call any pool/price related functions within the official SDK to work with this fork. All that has changed is that the constraint for pools to have all ticks pre-fetched is removed. Take the following exmaple:

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

# Uniswap V3 SDK

[![npm version](https://img.shields.io/npm/v/@uniswap/v3-sdk/latest.svg)](https://www.npmjs.com/package/@uniswap/v3-sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@uniswap/v3-sdk/latest.svg)](https://bundlephobia.com/result?p=@uniswap/v3-sdk@latest)

In-depth documentation on this SDK is available at [uniswap.org](https://docs.uniswap.org/).
