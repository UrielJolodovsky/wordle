import ConfirmationModal from "@/components/ConfirmationModal";
import Header from "@/components/Header";


export default function Home() {
    return (
        <div className="w-screen h-screen bg-landingColor">
            <Header inHome={false} />
            <ConfirmationModal isOpen={true} />
        </div>
    )
}