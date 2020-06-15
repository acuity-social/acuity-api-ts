import { ApiPromise, WsProvider } from '@polkadot/api'

export default class AcuityApi {
  api: any

  async init() {
    let wsProvider = new WsProvider('ws://localhost:9944')
    this.api = await ApiPromise.create({ provider: wsProvider })
    await this.api.isReady
  }

  async getInfo() {
    return {
      genesisHash: this.api.genesisHash.toHex(),
      runtimeMetadata: this.api.runtimeMetadata,
      runtimeVersion: this.api.runtimeVersion,
      libraryInfo: this.api.libraryInfo,
      chain: await this.api.rpc.system.chain(),
      name: await this.api.rpc.system.name(),
      version: await this.api.rpc.system.version(),
    }
  }

  async getBlockNumber() {
    let lastHeader = await this.api.rpc.chain.getHeader()
    return parseInt(lastHeader.number.toString())
  }
}
