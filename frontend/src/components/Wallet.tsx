import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, } from "lucide-react";
import { Card, CardBody, CardHeader, ScrollShadow } from "@nextui-org/react";
import { WalletCards } from 'lucide-react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store/store";
import { getWalletDetails } from "../services/store/features/userServices";
import CustomToast from "./userComponents/CustomToast";
import { toast } from "sonner";
import { ITransaction } from "../utils/type/userType";


export default function Wallet() {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const [balance, setBalance] = useState<number>(0);
    useEffect(() => {
        async function getWalletAmountTransaction() {
            try {

                const response = await dispatch(getWalletDetails()).unwrap()
                if (response) {
                    setBalance(response.result.walletBalance)
                    setTransactions(response.result.getTransactionDetails)
                }
            } catch (error: any) {

                toast(<CustomToast message={error || error.message} type="error" />);
            }

        }
        getWalletAmountTransaction()
    }, [])

    return (
        <Card className="max-w-sm sm:max-w-md lg:max-w-2xl bg-gray-200 rounded-lg mx-auto">
            <CardHeader className="text-center flex flex-col justify-start">
                <h1 className="text-2xl font-semibold">My Wallet</h1>
                <h6 className="font-normal text-sm text-gray-600">Securely manage your funds and transactions</h6>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col   items-center m-8 p-6 bg-primary rounded-lg shadow-lg" >
                    <div className="flex items-center  gap-3 font-bold text-white">
                        <WalletCards className="w-12 h-12 text-base text-white text-start mb-2" />
                        <h1 className="text-2xl ">Balance$ {balance.toFixed(2)}</h1>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
                    <ScrollShadow className="h-[250px]">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className="flex items-center justify-between py-3 border-b last:border-none"
                            >
                                <div className="flex items-center">
                                    <div className="ml-3">

                                        <p className="text-xs text-muted-foreground">{new Date(transaction.timestamp).toDateString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2>{transaction.description}</h2>
                                </div>
                                <div
                                    className={`flex items-center ${transaction?.type === "credit" ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {transaction.type === "debit" ? (
                                        <ArrowDownIcon className="mr-1 h-4 w-4" />
                                    ) : (
                                        <ArrowUpIcon className="mr-1 h-4 w-4" />
                                    )}
                                    <span className="text-sm font-semibold">${transaction.amount}</span>
                                </div>
                            </div>
                        ))}
                    </ScrollShadow>
                </div>
            </CardBody>
        </Card>
    );
}
