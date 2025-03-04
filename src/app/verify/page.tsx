"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function EmailVerification() {
    const [code, setCode] = useState<string[]>(new Array(8).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return; // Only allow numbers
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move focus to the next input if a digit is entered
        if (value && index < 7) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex mt-10 flex-col items-center justify-center px-4">
            <div className="bg-white border px-10 pt-10 pb-10 rounded-2xl border-gray-300 shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-2">Verify your email</h2>
                <p className="text-gray-500 text-center mb-6">
                    Enter the 8-digit code you have received on dev****@revispy.com
                </p>
                <div className="flex justify-center gap-2 mb-6">
                    {code.map((num, index) => (
                        <Input
                            key={index}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }}
                            className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 focus:ring-2 focus:ring-black"
                            maxLength={1}
                            value={num}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
                <Button className="w-full bg-black text-white text-lg py-2">VERIFY</Button>
            </div>
        </div>
    );
}
