import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import clsx from "clsx";
export const questions = [
  {
    //1
    label: "How does lending work?",
    value: (
      <>
        VibrantX enables you to supply assets to earn yield, and to borrow
        assets (coming soon) to increase your leverage, or to engage in various
        other DeFi activities within the Aptos ecosystem. VibrantX lending is
        built to give both lenders and borrowers the comprehe
      </>
    ),
  },
  {
    //2
    label: "What are the risks for lenders?",
    value: (
      <div className="grid gap-3">
        <div>
          Lenders are subjected to Borrower Default Risk and Protocol Smart
          Contract Risk:
        </div>
        <div className="text-primary-450 text-base font-bold  leading-normal">
          Borrower Default Risk
        </div>
        <div>
          If you are depositing an asset, you earn yield when other users borrow
          your assets. In the mean time, you are now subject to Borrowers
          Default Risk, which means if borrowers fail to repay their debt, you
          might lose access to your funds. In practice, the losses from bad
          debts are spread out between lenders in the protocols.
        </div>
        <div className=" text-base font-bold leading-normal">
          Smart Contract Risk
        </div>
        <div>
          All borrowing/ lending activities are facilitated by a set of smart
          contracts.The smart contracts are audited and open source. VibrantX
          connects users to lending protocols on Aptos, and users are subject to
          smart contract risk of the specific protocols they choose.
        </div>
      </div>
    ),
  },
  {
    //3
    label: "Is VibrantX audited?",
    value: (
      <div>
        Yes. You can view the protocol audits{" "}
        <a
          target="_blank"
          href="https://docs.vibrantx.finance/audit"
          className="text-blue-500"
        >
          {" "}
          here.
        </a>
      </div>
    ),
  },
  {
    //4
    label: "How does VibrantX protect users from risk?",
    value: (
      <div>
        VibrantX works closely with Aptos Foundation and member protocols to
        perform thorough diligence on the strategies before listing them on our
        platform. We make sure users have access to highly trusted and
        comprehensively audited protocols. Additionally, users can learn more
        about Aptos ecosystem and Dapps via our educational contents and market
        updates
        <br />
        <br />
        Disclaimer: Crypto is a constantly changing industry, so we encourage
        users to do extra research about Dapps before deploying your capital.
      </div>
    ),
  },
  {
    //5
    label: "Where does the yield (APY) come from when users stake?",
    value: (
      <div>
        <span>
          Users lock-in their APT to help secure the blockchain and earn staking
          rewards in return. The staking yield is fluctuated based on the total
          staked amount, i.e. the more APTs are staked, the less the staking
          yield is. Current annual network reward rate on Aptos is 7%, which is
          expected to gradually decrease over time as the network matures. The
          leading staking protocols on Aptos (i.e. Thala and Amnis) are
          currently able to offer higher rate than natural yield as they employ
          dual token models which enable them to earn extra yield from providing
          liquidity across pools on Aptos ecosystem. Visit the protocol docs (
        </span>
        <a
          href="https://docs.thala.fi/thala-protocol-design/liquid-staking-thapt"
          className="text-indigo-500 t"
          target="_blank"
        >
          https://docs.thala.fi/thala-protocol-design/liquid-staking-thapt
        </a>
        <span> & </span>
        <a
          href="https://stake.amnis.finance/"
          target="_blank"
          className="text-indigo-500 "
        >
          https://stake.amnis.finance/
        </a>
        <span>) if you want to learn more about the dual token model.</span>
      </div>
    ),
  },
  {
    //6
    label: "When can users withdraw from their stake position?",
    value: (
      <div>
        There are two ways to get your funds back from staking: You can either
        naturally unstake your funds and wait 30 days cooling period before
        claiming the funds back to your wallet, or you can swap the staking
        tokens to native tokens on the liquidity pools immediately, which
        incurring some trading fees and slippage.
      </div>
    ),
  },
  {
    //7
    label: "What are the risks of staking strategies?",
    value: (
      <div>
        By delegating your APT to the staking protocols, you trust the protocols
        to secure the network on your behalf. If the validators perform any
        malicious activities, they are banned from validating blocks and you
        lose the opportunity to earn staking rewards. Generally, staking risk is
        minimal for users compared to other DeFi strategies.
      </div>
    ),
  },
];
const Questions = () => {
  return (
    <Box className="pb-[120px]">
      <Box className="text-center text-neutral-700 text-6xl font-semibold  mx-auto pb-8">
        Frequently Asked Questions
      </Box>
      <Accordion defaultIndex={[0]} allowMultiple>
        {questions.map((ele, index) => {
          return (
            <AccordionItem
              key={index}
              className={clsx("!pb-0", index === 0 && "!border-t-0")}
            >
              <h2>
                <AccordionButton className="!py-4 ">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className=" text-neutral-700 text-xl font-bold leading-loose "
                  >
                    {index + 1}
                    {". "}
                    {ele.label}
                  </Box>

                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel className="!py-0 ">
                <Box className="text-primary-450 text-base font-medium leading-normal pb-4">
                  {ele?.value}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};
export default Questions;
