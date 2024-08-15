import { defineConfig } from 'vitepress'
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: "MWC Documentations",
  description: "A VitePress Site",
  cleanUrls: true,
  lastUpdated: true,
  
  themeConfig: {
    nav: nav(),
    outline: {
      level: "deep",
    },

    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },
    editLink: {
      pattern: 'https://github.com/mwcproject/docs.mwc.mw/edit/main/:path'
    },
    
    // https://vitepress.dev/reference/default-theme-config

    sidebar:{
      "/": sidebarHome(),
    }, 

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mwcproject/docs.mwc.mw' }
    ]
  },

  // The transformPageData hook should be outside the themeConfig object
  transformPageData(pageData) {
    // Check if the current page is the "wallet/ledger/" index
    if (pageData.relativePath === 'wallet/ledger/index.md') {
      // Add redirect frontmatter
      pageData.frontmatter = {
        ...pageData.frontmatter,
        redirect: '/wallet/ledger/get-started',
      };
    }
    return pageData;
  },
});


function nav() {
  return [
    {
      text: "Quick start",
      items: [
        { text: "Nodes", link: "/nodes/overview" },
        { text: "Wallet", link: "/nodes/overview" },
        { text: "Miners", link: "/miners/overview" },
        
      ],
    },
    {
      text: "Join the network",
      items: [
        {
          text: "Quick start",
          items: [
            { text: "Nodes", link: "/node/overview" },
            { text: "Wallet", link: "/wallet/overview" },
            { text: "Miner", link: "/miner/overview" },
          ],
        },
        { text: "Learn", link: "/learn/how-mwc-works/overview" },
        //{ text: "Networks", link: "/nodes/participate" },
        { text: "Developers", link: "/developers/build-modular" },
        { text: "Community", link: "/community/overview" },
        
      ],
    },
  ];
}



function sidebarHome() {
  return [
    {
      text: "Quick start",
      collapsed: true,
      items: [
        {
          text: "Nodes",
          collapsed: true,
          items: [
            {
              text: "Introduction",
              link: "/learn/how-mwc-works/overview",
            },
            {
              text: "Monolithic vs. modular blockchains",
              link: "/learn/how-mwc-works/monolithic-vs-modular",
            },
            {
              text: "Data availability layer",
              collapsed: true,
              items: [
                {
                  text: "mwc's data availability layer",
                  link: "/learn/how-mwc-works/data-availability-layer",
                },
                {
                  text: "The lifecycle of a mwc-app transaction",
                  link: "/learn/how-mwc-works/transaction-lifecycle",
                },
              ],
            },
            {
              text: "Extra resources",
              collapsed: true,
              items: [
                {
                  text: "Learn modular",
                  link: "https://mwc.org/learn/",
                },
                {
                  text: "mwc-app specifications",
                  link: "https://mwcorg.github.io/mwc-app/",
                },
                {
                  text: "mwc-node API documentation",
                  link: "https://node-rpc-docs.mwc.org/",
                },
                {
                  text: "mwc glossary",
                  link: "https://mwc.org/glossary/",
                },
              ],
            },
          ],
        },
        {
          text: "mwc",
          collapsed: true,
          items: [
            {
              text: "Overview of mwc",
              link: "/learn/mwc",
            },
            {
              text: "Paying for blobspace",
              link: "/learn/paying-for-blobspace",
            },
            {
              text: "Staking, governance, & supply",
              link: "/learn/staking-governance-supply",
            },
            {
              text: "How to stake mwc",
              link: "/learn/how-to-stake-mwc",
            },
            {
              text: "Staking dashboards",
              link: "/learn/staking",
            },
          ],
        },
      ],
    },
    {
      text: "Wallets",
      collapsed: true,
      items: [
        {
          text: "Desktop",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              link: "/wallet/desktop/get-started"
            },
            {
              text: "Setting Up Your Wallet",
              collapsed: true,
              items: [
                {
                  text: "Creating Your Wallet",
                  link: "/wallet/desktop/setup/create-wallet"
                },
                {
                  text: "Backup and Recovery",
                  link: "/wallet/desktop/setup/backup-recovery"
                }
              ]
            },
            {
              text: "Managing Your Funds",
              collapsed: true,
              items: [
                {
                  text: "Sending MWC",
                  link: "/wallet/desktop/funds/sending"
                },
                {
                  text: "Receiving MWC",
                  link: "/wallet/desktop/funds/receiving"
                }
              ]
            },
            {
              text: "Advanced Features",
              collapsed: true,
              items: [
                {
                  text: "Atomic Swaps",
                  link: "/wallet/desktop/advanced/atomic-swaps"
                },
                {
                  text: "Privacy Features",
                  link: "/wallet/desktop/advanced/privacy-features"
                }
              ]
            },
            {
              text: "Troubleshooting and Support",
              link: "/wallet/desktop/troubleshooting"
            },
            {
              text: "FAQ",
              link: "/faq"
            }
          ]
        },
        {
          text: "Mobile",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              link: "/wallet/mobile/get-started"
            },
            {
              text: "Setting Up Your Wallet",
              collapsed: true,
              items: [
                {
                  text: "Creating Your Wallet",
                  link: "/wallet/mobile/setup/create-wallet"
                },
                {
                  text: "Backup and Recovery",
                  link: "/wallet/mobile/setup/backup-recovery"
                }
              ]
            },
            {
              text: "Managing Your Funds",
              collapsed: true,
              items: [
                {
                  text: "Sending MWC",
                  link: "/wallet/mobile/funds/sending"
                },
                {
                  text: "Receiving MWC",
                  link: "/wallet/mobile/funds/receiving"
                }
              ]
            },
            {
              text: "Advanced Features",
              collapsed: true,
              items: [
                {
                  text: "Atomic Swaps",
                  link: "/wallet/mobile/advanced/atomic-swaps"
                },
                {
                  text: "Privacy Features",
                  link: "/wallet/mobile/advanced/privacy-features"
                }
              ]
            },
            {
              text: "Troubleshooting and Support",
              link: "/wallet/mobile/troubleshooting"
            },
            {
              text: "FAQ",
              link: "/wallet/mobile/faq"
            }
          ]
        },        
        {
          text: "Web",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              link: "/wallet/web/get-started"
            },
            {
              text: "Setting Up Your Wallet",
              collapsed: true,
              items: [
                {
                  text: "Creating Your Wallet",
                  link: "/wallet/web/setup/create-wallet"
                },
                {
                  text: "Backup and Recovery",
                  link: "/wallet/web/setup/backup-recovery"
                }
              ]
            },
            {
              text: "Managing Your Funds",
              collapsed: true,
              items: [
                {
                  text: "Sending MWC",
                  link: "/wallet/web/funds/sending"
                },
                {
                  text: "Receiving MWC",
                  link: "/wallet/web/funds/receiving"
                }
              ]
            },
            {
              text: "Advanced Features",
              collapsed: true,
              items: [
                {
                  text: "Atomic Swaps",
                  link: "/wallet/web/advanced/atomic-swaps"
                },
                {
                  text: "Privacy Features",
                  link: "/wallet/web/advanced/privacy-features"
                }
              ]
            },
            {
              text: "Troubleshooting and Support",
              link: "/wallet/web/troubleshooting"
            },
            {
              text: "FAQ",
              link: "/wallet/web/faq"
            }
          ]
        },
        {
          text: "Console",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              link: "/wallet/console/get-started"
            },
            {
              text: "Setting Up Your Wallet",
              collapsed: true,
              items: [
                {
                  text: "Creating Your Wallet",
                  link: "/wallet/console/setup/create-wallet"
                },
                {
                  text: "Backup and Recovery",
                  link: "/wallet/console/setup/backup-recovery"
                },
                {
                  text: "Advanced Settings",
                  link: "/wallet/console/setup/advanced-settings"
                }
              ]
            },
            {
              text: "Managing Your Funds",
              collapsed: true,
              items: [
                {
                  text: "Sending MWC",
                  link: "/wallet/console/funds/sending"
                },
                {
                  text: "Receiving MWC",
                  link: "/wallet/console/funds/receiving"
                }
              ]
            },
            {
              text: "Advanced Features",
              collapsed: true,
              items: [
                {
                  text: "Atomic Swaps",
                  link: "/wallet/console/advanced/atomic-swaps"
                },
                {
                  text: "Marketplace",
                  link: "/wallet/console/advanced/privacy-features"
                }
              ]
            },
            {
              text: "Troubleshooting and Support",
              link: "/wallet/console/troubleshooting"
            },
            {
              text: "FAQ",
              link: "/wallet/console/faq"
            }
          ]
        },
        {
          text: "Ledger",
          collapsed: true,
          items: [
            {
              text: "Getting Started",
              link: "/wallet/ledger/get-started"
            },
            {
              text: "Setting Up Your Wallet",
              collapsed: true,
              items: [
                {
                  text: "Creating Your Wallet",
                  link: "/wallet/ledger/setup/create-wallet"
                },
                {
                  text: "Backup and Recovery",
                  link: "/wallet/ledger/setup/backup-recovery"
                }
              ]
            },
            {
              text: "Managing Your Funds",
              collapsed: true,
              items: [
                {
                  text: "Sending MWC",
                  link: "/wallet/ledger/funds/sending"
                },
                {
                  text: "Receiving MWC",
                  link: "/wallet/ledger/funds/receiving"
                }
              ]
            },
            {
              text: "Troubleshooting and Support",
              link: "/wallet/web/troubleshooting"
            },
            {
              text: "FAQ",
              link: "/wallet/web/faq"
            }
          ]
        },
      ],
    },
    {
      text: "Miners",
      collapsed: true,
      items: [
        {
          text: "Overview of mwc",
          collapsed: true,
          items: [
            {
              text: "Introduction",
              link: "/learn/how-mwc-works/overview",
            },
            {
              text: "Monolithic vs. modular blockchains",
              link: "/learn/how-mwc-works/monolithic-vs-modular",
            },
            {
              text: "Data availability layer",
              collapsed: true,
              items: [
                {
                  text: "mwc's data availability layer",
                  link: "/learn/how-mwc-works/data-availability-layer",
                },
                {
                  text: "The lifecycle of a mwc-app transaction",
                  link: "/learn/how-mwc-works/transaction-lifecycle",
                },
                {
                  text: "Data retrievability and pruning",
                  link: "/learn/retrievability",
                },
                {
                  text: "Data availability FAQ",
                  link: "/learn/how-mwc-works/data-availability-faq",
                },
              ],
            },
            {
              text: "Extra resources",
              collapsed: true,
              items: [
                {
                  text: "Learn modular",
                  link: "https://mwc.org/learn/",
                },
                {
                  text: "mwc-app specifications",
                  link: "https://mwcorg.github.io/mwc-app/",
                },
                {
                  text: "mwc-node API documentation",
                  link: "https://node-rpc-docs.mwc.org/",
                },
                {
                  text: "mwc glossary",
                  link: "https://mwc.org/glossary/",
                },
              ],
            },
          ],
        },
        {
          text: "mwc",
          collapsed: true,
          items: [
            {
              text: "Overview of mwc",
              link: "/learn/mwc",
            },
          ],
        },
      ],
    },
    {
      "text": "Learn MimbleWimble",
      "collapsed": true,
      "items": [
        {
          "text": "Introduction to MimbleWimble",
          "items": [
            {
              "text": "Overview of MimbleWimble",
              "link": "/mimblewimble/introduction-overview"
            },
            {
              "text": "History and Development",
              "link": "/mimblewimble/history-development"
            }
          ]
        },
        {
          "text": "Core Concepts",
          "items": [
            {
              "text": "Confidenmwcl Transactions",
              "link": "/core-concepts/confidenmwcl-transactions"
            },
            {
              "text": "Blinding Factors",
              "link": "/core-concepts/blinding-factors"
            },
            {
              "text": "Transaction Aggregation",
              "link": "/core-concepts/transaction-aggregation"
            }
          ]
        },
        {
          "text": "Technical Details",
          "items": [
            {
              "text": "Block Structure",
              "link": "/technical-details/block-structure"
            },
            {
              "text": "Scriptless Scripts",
              "link": "/technical-details/scriptless-scripts"
            },
            {
              "text": "Dandelion Protocol",
              "link": "/technical-details/dandelion-protocol"
            }
          ]
        },
        {
          "text": "Security and Privacy",
          "items": [
            {
              "text": "Benefits and Limitations",
              "link": "/security-privacy/benefits-limitations"
            },
            {
              "text": "Comparative Analysis",
              "link": "/security-privacy/comparative-analysis"
            }
          ]
        },
        {
          "text": "Future Developments",
          "items": [
            {
              "text": "Upcoming Features",
              "link": "/future-developments/upcoming-features"
            },
            {
              "text": "Research Areas",
              "link": "/future-developments/research-areas"
            }
          ]
        },
        {
          "text": "FAQ",
          "items": [
            {
              "text": "Frequently Asked Questions",
              "link": "/faq-mimblewimble"
            }
          ]
        }
      ]
    },    
    {
      text: "Developers",
      collapsed: true,
      items: [
        { text: "Build modular", link: "/developers/build-modular" },
        {
          text: "Submitting data blobs to mwc",
          link: "/developers/submit-data",
        },
        {
          text: "Transaction resubmission guidelines",
          link: "/developers/transaction-resubmission",
        },
        {
          text: "Node API",
          link: "/developers/node-api",
          collapsed: true,
          items: [
            {
              text: "Node RPC CLI tutorial",
              link: "/developers/node-tutorial",
            },
            {
              text: "mwc-node RPC API documentation",
              link: "https://node-rpc-docs.mwc.org/",
            },
            { text: "Prompt Scavenger", link: "/developers/prompt-scavenger" },
          ],
        },
        {
          text: "Integrate with Blobstream",
          collapsed: true,
          items: [
            {
              text: "Overview of Blobstream",
              link: "/developers/blobstream",
            },
            {
              text: "Integrate with Blobstream contracts",
              link: "/developers/blobstream-contracts",
            },
            {
              text: "Integrate with Blobstream client",
              link: "/developers/blobstream-offchain",
            },
            {
              text: "Querying the Blobstream proofs",
              link: "/developers/blobstream-proof-queries",
            },
            {
              text: "Local Blobstream X operators",
              collapsed: true,
              items: [
                {
                  text: "Requesting data commitment ranges",
                  link: "/developers/requesting-data-commitment-ranges",
                },
                {
                  text: "New Blobstream X deployments",
                  link: "/developers/blobstream-x-deploy",
                },
              ],
            },
          ],
        },
        {
          text: "Deploy a rollup",
          link: "/developers/rollup-overview",
          collapsed: true,
          items: [
            {
              text: "Ethereum L2s",
              collapsed: true,
              items: [
                {
                  text: "Ethereum fallback mechanism",
                  link: "/developers/ethereum-fallback",
                },
                {
                  text: "Arbitrum",
                  collapsed: true,
                  items: [
                    {
                      text: "Introduction to Arbitrum rollups with mwc as DA",
                      link: "/developers/arbitrum-integration",
                    },
                    {
                      text: "Deploy an Arbitrum rollup devnet",
                      link: "/developers/arbitrum-deploy",
                    },
                    // {
                    //   text: "Deploy an Arbitrum rollup to Mocha testnet",
                    //   link: "/developers/arbitrum-mocha",
                    // },
                    {
                      text: "Nitrogen testnet",
                      link: "/developers/nitrogen",
                    },
                    {
                      text: "Deploy a smart contract on Arbitrum rollup",
                      link: "/developers/arbitrum-smart-contract",
                    },
                    {
                      text: "Deploy a dapp on your Arbitrum rollup devnet",
                      link: "/developers/arbitrum-dapp-deploy",
                    },
                  ],
                },
                {
                  text: "Optimism",
                  collapsed: true,
                  items: [
                    {
                      text: "Intro to OP Stack integration",
                      link: "/developers/intro-to-op-stack",
                    },
                    {
                      text: "Bubs testnet",
                      link: "/developers/bubs-testnet",
                    },
                    {
                      text: "Deploy a smart contract on Bubs testnet",
                      link: "/developers/deploy-on-bubs",
                    },
                    {
                      text: "Deploy a dapp on Bubs testnet",
                      link: "/developers/gm-portal-bubs",
                    },
                    {
                      text: "Deploy an OP Stack devnet",
                      link: "/developers/optimism-devnet",
                    },
                    {
                      text: "Deploy an OP Stack devnet on mwc",
                      link: "/developers/optimism",
                    },
                    {
                      text: "Audit",
                      link: "https://docs.mwc.org/mwc_OP_Stack_Audit.pdf",
                    },
                    {
                      text: "Deploy a dapp with thirdweb",
                      link: "https://thirdweb.com/bubs-testnet",
                    },
                    {
                      text: "Rollups-as-a-Service",
                      collapsed: true,
                      items: [
                        {
                          text: "Caldera",
                          link: "https://caldera.xyz/",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { text: "Rollkit", link: "/developers/rollkit" },
            {
              text: "Astria",
              collapsed: true,
              items: [
                { text: "Documentation", link: "https://docs.astria.org" },
                {
                  text: "Deploy to Dusknet",
                  link: "https://docs.astria.org/docs/dusknet/overview/",
                },
              ],
            },
            {
              text: "Sovereign SDK",
              link: "https://github.com/Sovereign-Labs/sovereign-sdk/tree/stable/examples/demo-rollup#demo-rollup",
            },
            {
              text: "Vistara",
              link: "https://docs.vistara.dev/",
            },
            {
              text: "Dymension",
              link: "https://dymension.xyz/",
            },
          ],
        },
        {
          text: "Wallets",
          collapsed: true,
          items: [
            { text: "mwc-node", link: "/developers/mwc-node-key" },
            {
              text: "Integrating Wallets for developers",
              link: "/developers/wallets",
            },
          ],
        },
        {
          text: "Integrate mwc for service providers",
          link: "/developers/integrate-mwc",
        },
      ],
    },
    {
      text: "Community",
      collapsed: true,
      items: [
        { text: "Overview", link: "/community/overview" },
        { text: "Code of Conduct", link: "/community/coc" },
        { text: "Community calendar", link: "/community/calendar" },
	{ text: "mwc Foundation Delegation Program", 
	  link: "/community/foundation-delegation-program"
	},
        {
          text: "Modular Meetups",
          collapsed: true,
          items: [
            { text: "Overview", link: "/community/modular-meetup-intro" },
            { text: "Guide", link: "/community/modular-meetup-guide" },
            { text: "Toolkit", link: "/community/modular-meetup-toolkit" },
            { text: "Speaker list", link: "/community/speaker-list" },
          ],
        },
        {
          text: "Incentivized testnet supplemental terms",
          link: "/community/itn-tos",
        },
      ],
    },
  ];
}