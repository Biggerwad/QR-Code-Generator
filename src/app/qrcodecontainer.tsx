"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Link, Mail, Download, LayoutGrid } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import Spinner from "@/components/ui/Spinner";

const QrCodeGenerator = () => {
    const [color, setColor] = React.useState("#ffffff");
    const [bgColor, setBgColor] = React.useState("#057FFF");
    const [url, setUrl] = React.useState("");
    const [logo, setLogo] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [])



    // Downloads event
    const handleDownload = (type: "png" | "svg") => {
        const qrCodeElem = document.getElementById("qr-code");

        if (qrCodeElem) {
            if (type === "png") {
                toPng(qrCodeElem)
                    .then((url) => {
                        saveAs(url, "qr-code.png");
                    })
                    .catch((err) => {
                        console.log("Error generating the QR Code", err);
                    });
            } else if (type === "svg") {
                const svgElem = qrCodeElem.querySelector("svg");

                if (svgElem) {
                    const saveSvg = new Blob([svgElem.outerHTML], {
                        type: "image/svg+xml;charset=utf-8",
                    });
                    saveAs(saveSvg, "my-qr-code.svg");
                }
            }
        }
    };

    // Email event handler
    const handleEmailInput = () => {
        const mailToLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
            message
        )}`;
        setUrl(mailToLink);
    };

    return (
        <>{loader ? <Spinner /> :

            <div className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full">
                <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ef7ff]/80 backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-[#88aed6]">
                            Your QR Code Generator
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                        <div className="h-full flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-6">
                                <Tabs
                                    defaultValue="link"
                                    className="space-y-6"
                                >
                                    <TabsList className="h-10 w-full grid grid-cols-2 bg-gray-800 text-lg">
                                        <TabsTrigger value="link" className="text-white font-bold">
                                            <Link className="w-4 h-4 mr-2" />
                                            Link
                                        </TabsTrigger>
                                        <TabsTrigger value="email" className="text-white font-bold">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="link">
                                        <div className="space-y-6">
                                            <div>
                                                <Label>URL</Label>
                                                <Input
                                                    id="url"
                                                    type="text"
                                                    value={url}
                                                    placeholder="https://mygenerator.com"
                                                    onChange={(e) => setUrl(e.target.value)}
                                                    className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="email">
                                        <div className="space-y-4">
                                            <div className="space-y-4">
                                                <Label
                                                    htmlFor="email"
                                                    className="font-semibold text-[#053FFF]"
                                                >
                                                    Email
                                                </Label>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    placeholder="Enter email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="subject"
                                                    className="font-semibold text-[#057FFF]"
                                                >
                                                    Subject
                                                </Label>
                                                <Input
                                                    id="subject"
                                                    type="text"
                                                    value={subject}
                                                    placeholder="Enter subject"
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="message"
                                                    className="font-semibold text-[#057FFF]"
                                                >
                                                    Message
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    value={message}
                                                    placeholder="Enter message"
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400 h-24 resize-none"
                                                />
                                            </div>

                                            <Button
                                                className="py-7 px-8 bg-[#057FFF] font-bold rounded-full uppercase"
                                                onClick={handleEmailInput}
                                            >
                                                Generate Your Email QR Code
                                            </Button>
                                        </div>

                                    </TabsContent>

                                    {/* Logo input section - always at the bottom */}
                                    <div className="space-y-2 mt-6">
                                        <Label htmlFor="logo" className="font-bold text-[#037FFF]">
                                            Logo
                                        </Label>

                                        <Input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setLogo(reader.result as string);
                                                    };
                                                    reader.readAsDataURL(e.target.files[0]);
                                                }
                                            }}
                                            className="w-full border-2 bg-transparent border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                        />

                                    </div>
                                </Tabs>
                            </div>

                            {/* QR CODE GENERATION SECTION */}
                            <div className="flex space-x-4">
                                <div className="space-y-2 flex-1">
                                    <Label htmlFor="color" className="font-semibold text-[#057FFF]">
                                        QR Code Color
                                    </Label>

                                    <div className="flex items-center gap-1">
                                        <div
                                            className="relative w-12 flex-1 h-12 rounded-md border-2 border-white/70"
                                            style={{ backgroundColor: color }}
                                        >
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>

                                        <Input
                                            type="text"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Background color */}
                                    <div className="space-y-2 flex-1">
                                        <Label
                                            htmlFor="color"
                                            className="font-semibold text-[#057FFF]"
                                        >
                                            Background Color
                                        </Label>

                                        <div className="flex items-center gap-1">
                                            <div
                                                className="relative w-12 flex-1 h-12 rounded-md border-2 border-white/70"
                                                style={{ backgroundColor: bgColor }}
                                            >
                                                <input
                                                    type="color"
                                                    value={bgColor}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <Input
                                                type="text"
                                                value={bgColor}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Display Section */}
                            <div className="relative flex-1  rounded-lg flex flex-col justify-center space-y-6">
                                <span>
                                    <LayoutGrid className="w-8 h-8 text-white absolute top-4 right-4" />
                                </span>

                                <div id="qr-code" className="flex justify-center p-8">
                                    <div className="relative">
                                        <QRCodeSVG
                                            value={url}
                                            size={256}
                                            fgColor={color}
                                            bgColor={bgColor}
                                            imageSettings={
                                                logo
                                                    ? { src: logo, height: 50, width: 50, excavate: true }
                                                    : undefined
                                            }
                                        />

                                        {logo && (
                                            <Image
                                                src={logo}
                                                alt="logo"
                                                className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 
                    -translate-y-1/2 
                    w-10 h-10 rounded-md border-none"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Download buttons */}
                                <div className="flex flex-col justify-center pb-6 gap-4">
                                    <Button variant="outline" onClick={() => handleDownload("png")}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download as PNG
                                    </Button>

                                    <Button variant="outline" onClick={() => handleDownload("svg")}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Download as SVG
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        }
        </>
    );
};

export default QrCodeGenerator;
