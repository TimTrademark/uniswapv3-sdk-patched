import { BigintIsh } from '@uniswap/sdk-core'
import { TickList } from '../utils/tickList'
import { Tick, TickConstructorArgs } from './tick'
import { TickDataProvider } from './tickDataProvider'

/**
 * A data provider for ticks that is backed by an in-memory array of ticks.
 */
export class TickListDataProvider implements TickDataProvider {
  private ticks: readonly Tick[]

  constructor(ticks: (Tick | TickConstructorArgs)[], tickSpacing: number) {
    const ticksMapped: Tick[] = ticks.map((t) => (t instanceof Tick ? t : new Tick(t)))
    TickList.validateList(ticksMapped, tickSpacing)
    this.ticks = ticksMapped
  }
  getLowestTick(): number {
    if (this.ticks.length == 0) throw new Error('Empty ticklist, cannot get lowest tick')
    if (this.ticks.length == 1) return this.ticks[0].index
    let lowest = this.ticks[0].index
    for (let i = 1; i < this.ticks.length; ++i) {
      if (this.ticks[i].index < lowest) lowest = this.ticks[i].index
    }
    return lowest
  }
  getHighestTick(): number {
    if (this.ticks.length == 0) throw new Error('Empty ticklist, cannot get lowest tick')
    if (this.ticks.length == 1) return this.ticks[0].index
    let highest = this.ticks[0].index
    for (let i = 1; i < this.ticks.length; ++i) {
      if (this.ticks[i].index > highest) highest = this.ticks[i].index
    }
    return highest
  }

  async getTick(tick: number): Promise<{ liquidityNet: BigintIsh; liquidityGross: BigintIsh }> {
    return TickList.getTick(this.ticks, tick)
  }

  async nextInitializedTickWithinOneWord(tick: number, lte: boolean, tickSpacing: number): Promise<[number, boolean]> {
    return TickList.nextInitializedTickWithinOneWord(this.ticks, tick, lte, tickSpacing)
  }
}
