import { useRouter } from "next/navigation"

const GoBack = () => {
    const router = useRouter();
    return (
        <button type="button" className="bg-green-500 text-white active:bg-green-600 mr-2" onClick={() => router.back()}>
            Back
        </button>

    )
}

export default GoBack