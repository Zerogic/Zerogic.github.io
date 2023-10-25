import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  darkTheme,
} from "@thirdweb-dev/react";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import Navbar from "../component/navbar";
import Idrc from "../component/Idrc";
import { Box } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { stakingContractAddress } from "../const/yourDetails";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

export default function Home() {
  const address = useAddress();
  const [amountToStake, setAmountToStake] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);

  // Initialize all the contracts
  const { contract: staking, isLoading: isStakingLoading } = useContract(
    stakingContractAddress,
    "custom"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Get contract data from staking contract
  const { data: rewardTokenAddress } = useContractRead(staking, "rewardToken");
  const { data: stakingTokenAddress } = useContractRead(
    staking,
    "stakingToken"
  );

  // Initialize token contracts
  const { contract: stakingToken, isLoading: isStakingTokenLoading } =
    useContract(stakingTokenAddress, "token");
  const { contract: rewardToken, isLoading: isRewardTokenLoading } =
    useContract(rewardTokenAddress, "token");

  // Token balances
  const { data: stakingTokenBalance, refetch: refetchStakingTokenBalance } =
    useTokenBalance(stakingToken, address);
  const { data: rewardTokenBalance, refetch: refetchRewardTokenBalance } =
    useTokenBalance(rewardToken, address);

  // Get staking data
  const {
    data: stakeInfo,
    refetch: refetchStakingInfo,
    isLoading: isStakeInfoLoading,
  } = useContractRead(staking, "getStakeInfo", [address || "0"]);

  useEffect(() => {
    setInterval(() => {
      refetchData();
    }, 10000);
  }, []);

  const refetchData = () => {
    refetchRewardTokenBalance();
    refetchStakingTokenBalance();
    refetchStakingInfo();
  };

  return (
    <div className={styles.container}>
      {/* NAV */}
      <div className={styles.connect}>
        <div>
          <img src="/zgc12.png" width={39} />
        </div>
        <div>
          <ConnectWallet
            theme={darkTheme({
              colors: {
                secondaryButtonBg: "#9e0000",
                connectedButtonBg: "#9e0000",
              },
            })}
            switchToActiveChain={true}
            modalSize={"compact"}
            welcomeScreen={{
              img: {
                src: "ipfs://QmSJFXUAMSf1GLtdSM7WyRcx58SzqpoQgN4hZLT8i3uRXJ/zgc-modified.png",
                width: 150,
                height: 150,
              },
              title: "Welcome to zerogic staking",
            }}
            modalTitleIconUrl={
              "ipfs://QmSJFXUAMSf1GLtdSM7WyRcx58SzqpoQgN4hZLT8i3uRXJ/zgc-modified.png"
            }
          />
        </div>
      </div>
      {/* NAV */}
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.ts}>Zerogic Stake</h1>
          <h6>Just Stake Some Tokens To Earn,High APY, Low Risk.</h6>
        </div>
      </div>
      {/* MENU */}
      {/* tombol c */}
      <div className={styles.atas}>
        <div className={styles.chek}>
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/zgc12.png"
          />
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/poly.png"
          />
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/quic.png"
          />
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/usdt.png"
          />
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/idrt.png"
          />
          <Avatar
            className={styles.lingkarandua}
            width={35}
            name="Zerogic"
            src="/tectonic.png"
          />
        </div>
      </div>

      <div className={styles.accor}>
        <div className={styles.menu2}>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton className={styles.menu}>
                  <Box
                    className={styles.box}
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    <div className={styles.boxx}>
                      <img src="/zgcs.png" width={30} />
                      <h5 className={styles.pad}>Stake Zgc Earn Idrt</h5>
                    </div>
                    <h5>
                      {stakeInfo &&
                        ethers.utils.formatEther(stakeInfo[1].toString())}
                    </h5>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className={styles.now}>
                  <h4>
                    <span className={styles.ap}>Idrt</span> Earned
                  </h4>
                  <div className={styles.reward}>
                    <h4 className={styles.now}>
                      {stakeInfo &&
                        ethers.utils.formatEther(stakeInfo[1].toString())}
                    </h4>
                    <div className={styles.but}>
                      <Web3Button
                        contractAddress={stakingContractAddress}
                        action={async (contract) => {
                          await contract.call("claimRewards", []);
                          alert("Rewards claimed successfully!");
                        }}
                      >
                        Harvest
                      </Web3Button>
                    </div>
                  </div>
                </div>
                <div className={styles.now}>
                  <div>
                    <h4>
                      <span className={styles.ap}>Zgc</span> Staked
                    </h4>
                  </div>
                  <div className={styles.reward}>
                    <h4 className={styles.now}>
                      {stakeInfo &&
                        ethers.utils.formatEther(stakeInfo[0].toString())}
                    </h4>
                    <div className={styles.but}>
                      <div>
                        <Button className={styles.button} onClick={onOpen}>
                          Stake
                        </Button>

                        <Modal
                          className={styles.up}
                          closeOnOverlayClick={false}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent className={styles.modal}>
                            <ModalCloseButton className={styles.clos} />
                            <ModalHeader>Wallet Balance</ModalHeader>

                            <ModalBody pb={6}>
                              <div className={styles.judul}>
                                <p>IdrcBalance:</p>
                                <p>{rewardTokenBalance?.displayValue}</p>
                              </div>
                              <div className={styles.judul}>
                                <p>Zgc Balance:</p>
                                <p>{stakingTokenBalance?.displayValue}</p>
                              </div>
                            </ModalBody>
                            <div className={styles.close}>
                              <input
                                className={styles.textbox}
                                type="number"
                                value={amountToStake}
                                onChange={(e) =>
                                  setAmountToStake(e.target.value)
                                }
                              />
                              <input
                                className={styles.textbox}
                                type="number"
                                value={amountToWithdraw}
                                onChange={(e) =>
                                  setAmountToWithdraw(e.target.value)
                                }
                              />
                            </div>
                            <ModalFooter>
                              <Web3Button
                                className={styles.clos}
                                contractAddress={stakingContractAddress}
                                action={async (contract) => {
                                  await stakingToken.setAllowance(
                                    stakingContractAddress,
                                    amountToStake
                                  );
                                  await contract.call("stake", [
                                    ethers.utils.parseEther(amountToStake),
                                  ]);
                                  alert("Tokens staked successfully!");
                                }}
                              >
                                Stake
                              </Web3Button>
                              <Web3Button
                                className={styles.clos}
                                contractAddress={stakingContractAddress}
                                action={async (contract) => {
                                  await contract.call("withdraw", [
                                    ethers.utils.parseEther(amountToWithdraw),
                                  ]);
                                  alert("Tokens unstaked successfully!");
                                }}
                              >
                                Unstake
                              </Web3Button>
                            </ModalFooter>
                            <div className={styles.foder}>
                              <img src="/zgc12.png" width={70} />
                              <h1>Z e r o g i c</h1>
                            </div>
                          </ModalContent>
                        </Modal>
                        <div />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bung}>
                  <div className={styles.foot}>
                    <h4>APR:</h4>
                    <h4>3.56%</h4>
                  </div>
                  <div className={styles.foot}>
                    <h4>Reward</h4>
                    <h4>500.000 Idrt</h4>
                  </div>
                  <div className={styles.foot}>
                    <h4>Ends in:</h4>
                    <div className={styles.ass}>
                      <a className={styles.ap} href="">
                        Finished
                      </a>
                      <a className={styles.ap} href="https://rupiahtoken.com/">
                        View Project
                      </a>
                      <a
                        className={styles.ap}
                        href="https://polygonscan.com/address/0x8e85dd7816369fea2a3722f2e88e30a3473a711e"
                      >
                        View Contract
                      </a>
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
            <Navbar />
            <Idrc />
          </Accordion>
        </div>
      </div>
      {/* staking */}

      <div className={styles.gambar}>
        <img src="/wew.png" width={250} className={styles.down} />
      </div>
      <div className={styles.iframee}>
        <h1 id="">Add Liquidity</h1>
        <iframe
          src="https://plaxswap.io/add/MATIC/0x4A7db095D7D56De8af219a5aE9C0b3Be11F240F5"
          width={350}
          height={600}
        ></iframe>
      </div>
    </div>
  );
}
