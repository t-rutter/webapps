import * as types from 'teleterm/services/tshd/types';
import { Store, useStore } from 'shared/libs/stores';

type State = {
  clusters: Map<string, types.Cluster>;
  gateways: Map<string, types.Gateway>;
  servers: Map<string, types.Server>;
  dbs: Map<string, types.Database>;
};

export default class TshService extends Store<State> {
  client: types.ApiClient;

  state: State = {
    clusters: new Map(),
    gateways: new Map(),
    servers: new Map(),
    dbs: new Map(),
  };

  constructor(client: types.ApiClient) {
    super();
    this.client = client;
  }

  async addCluster(addr: string) {
    const cluster = await this.client.createCluster(addr);
    this.state.clusters.set(cluster.uri, cluster);
    this.setState({
      clusters: new Map(this.state.clusters),
    });
  }

  async login({ clusterUri, local, oss }: LoginOptions) {
    if (local) {
      await this.client.localLogin(clusterUri, local.username, local.password);
    } else if (oss) {
      await this.client.ssoLogin(
        clusterUri,
        oss.providerType,
        oss.providerName
      );
    } else {
      throw Error('unknown login request parameters');
    }

    await this.fetchCluster(clusterUri);
  }

  async fetchCluster(uri: string) {
    const cluster = await this.client.getCluster(uri);
    this.state.clusters.set(uri, cluster);
    this.setState({
      clusters: new Map(this.state.clusters),
    });
  }

  async fetchClusters() {
    const clusters = await this.client.listClusters();
    this.setState({
      clusters: new Map(clusters.map(c => [c.uri, c])),
    });
  }

  async fetchGateways() {
    const gws = await this.client.listGateways();
    this.setState({
      gateways: new Map(gws.map(g => [g.uri, g])),
    });
  }

  async fetchDatabases(clusterUri: string) {
    const received = await this.client.listDatabases(clusterUri);
    const { dbs } = this.state;

    // remove previous cluster server entries
    for (let k of dbs.keys()) {
      if (k.startsWith(clusterUri)) {
        dbs.delete(k);
      }
    }

    received.forEach(s => dbs.set(s.uri, s));
    this.setState({
      dbs: new Map(dbs),
    });
  }

  async fetchServers(clusterUri: string) {
    const received = await this.client.listServers(clusterUri);
    const { servers } = this.state;

    // remove previous cluster server entries
    for (let k of servers.keys()) {
      if (k.startsWith(clusterUri)) {
        servers.delete(k);
      }
    }

    received.forEach(s => servers.set(s.uri, s));

    this.setState({
      servers: new Map(servers),
    });
  }

  async getAuthSettings(clusterUri: string) {
    return await this.client.getAuthSettings(clusterUri);
  }

  async createGateway(targetUri: string, port: string) {
    const gateway = await this.client.createGateway(targetUri, port);
    this.state.gateways.set(gateway.uri, gateway);
    this.setState({ gateways: new Map(this.state.gateways) });
    return gateway;
  }

  async removeGateway(gatewayUri: string) {
    await this.client.removeGateway(gatewayUri);
    this.state.gateways.delete(gatewayUri);
    this.setState({
      gateways: new Map(this.state.gateways),
    });
  }

  findCluster(clusterUri: string) {
    return this.state.clusters.get(clusterUri);
  }

  findDbs(clusterUri: string) {
    return [...this.state.dbs.values()].filter(db =>
      db.uri.startsWith(clusterUri)
    );
  }

  findGateway(gatewayUri: string) {
    return this.state.gateways.get(gatewayUri);
  }

  findDb(dbUri: string) {
    return this.state.dbs.get(dbUri);
  }

  findServers(clusterUri: string) {
    return [...this.state.servers.values()].filter(s =>
      s.uri.startsWith(clusterUri)
    );
  }

  getGateways() {
    return [...this.state.gateways.values()];
  }

  useState() {
    return useStore(this).state;
  }
}

export type LoginOptions = {
  clusterUri: string;
  oss?: {
    providerType: string;
    providerName: string;
  };
  local?: {
    username: string;
    password: string;
    token?: string;
  };
};
