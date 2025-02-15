export default function Layout({ children }) {
    return (
        <div class="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center items-center">
            <div class="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-blue-500 shadow-lg w-96 text-center">
                {children}
            </div>
        </div>
    );
}
