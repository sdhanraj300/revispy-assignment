"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InterestsPage() {
    const { data: session, status } = useSession();
    const [allInterests, setAllInterests] = useState<string[]>([]);
    useEffect(() => {
        const fetchInterests = async () => {
            const res = await fetch("api/interests");
            const data = await res.json();
            // console.log(data);
            setAllInterests(data.categories);
            // console.log(allInterests);
        };
        fetchInterests();
    }, []);
    useEffect(() => {
        const fetchInterests = async () => {
            if (!session) return;
            const res = await fetch("api/interests/" + session?.user?.email);
            const { interests } = await res.json();
            // console.log(interests);
            setSelectedInterests(interests);
        };
        fetchInterests();
    }, [session]);

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    // Pagination logic
    const paginatedInterests = allInterests.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((item) => item !== interest)
                : [...prev, interest]
        );
    };


    const handleSubmit = async () => {
        const res = await fetch("api/interests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ interests: selectedInterests, email: session?.user?.email }),
        });
        if (res.ok) {
            alert("Interests submitted successfully!");
        } else {
            alert("Failed to submit interests");
        }
    };
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (!session) {
        const router = useRouter();
        router.push("/login");
        return <div>Redirecting...</div>
    }
    return (
        <div className="max-w-lg mt-10 border-gray-400 border-1 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Please mark your interests!</h1>
            <p className="text-gray-500 text-center mb-4">We will keep you notified.</p>
            <hr className="mb-10" />
            <div className="space-y-3">
                <h1 className="text-2xl font-semibold">My Saved Interests!</h1>
                {paginatedInterests.map((interest, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                            checked={selectedInterests.includes(interest)}
                            onCheckedChange={() => toggleInterest(interest)}
                        />
                        <span className="text-lg">{interest}</span>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-4">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    {"<"}
                </Button>
                <span>{page}</span>
                <Button
                    variant="outline"
                    disabled={page * itemsPerPage >= allInterests.length}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    {">"}
                </Button>
            </div>
            <Button className="mx-auto mt-4 min-w-full cursor-pointer justify-center items-center" onClick={handleSubmit}>Submit</Button>
        </div>
    );
}
