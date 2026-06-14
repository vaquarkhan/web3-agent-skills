import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

/**
 * CDK stack for deploying Web3 MCP servers on ECS Fargate.
 * Each MCP server runs as a sidecar or separate service with stdio→HTTP adapter.
 */
export class Web3McpStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Web3McpVpc', { maxAzs: 2 }) as ec2.IVpc;

    const cluster = new ecs.Cluster(this, 'Web3McpCluster', { vpc });

    const servers = [
      'blockchain-rpc-server',
      'defi-protocol-server',
      'nft-metadata-server',
      'price-feed-server',
      'compliance-screening-server',
      'ipfs-storage-server',
    ];

    servers.forEach((name, i) => {
      new ecsPatterns.ApplicationLoadBalancedFargateService(this, `${name}Service`, {
        cluster,
        serviceName: name,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry(`web3-agent/${name}:latest`),
          containerPort: 3000 + i,
          environment: {
            NODE_ENV: 'production',
          },
        },
        publicLoadBalancer: false,
        desiredCount: 1,
      });
    });

    new cdk.CfnOutput(this, 'ClusterName', { value: cluster.clusterName });
  }
}
