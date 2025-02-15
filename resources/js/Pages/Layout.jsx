export default function Layout({ children }) {
    return (
        <div class="bg-gradient-to-r from-gray-900 via-blue-950 to-black min-h-screen w-screen flex justify-center items-center">
            {children}
        </div>
    );
}
