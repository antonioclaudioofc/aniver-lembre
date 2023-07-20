import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary px-32 py-7 mt-16 flex justify-between">
            <div className="text-text">
                <h2 className="text-4xl mb-6">Contato</h2>
                <h3 className="text-base mb-4">Contate-nos para dúvidas, sugestões ou suporte</h3>
            </div>
            <div className="flex flex-col justify-around">
                <a
                    className="flex gap-4"
                    href="https://www.linkedin.com/in/antonio-claudio-233741231/"
                    target="_blank"
                >
                    <Linkedin />
                    <span className="text-gray-200">antonioclaudio</span>
                </a>
                <a
                    className="flex gap-4"
                    href="https://github.com/antonioclaudioofc"
                    target="_blank"
                >
                    <Github />
                    <span className="text-gray-200">antonioclaudioofc</span>
                </a>
                <a
                    className="flex gap-4"
                    href=""
                >
                    <Mail />
                    <span className="text-gray-200">claudioalvesdev@gmail.com</span>
                </a>
            </div>
        </footer>
    )
}