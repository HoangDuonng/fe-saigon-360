"use client"
import Link from "next/link";

export default function Logo() {
    return (
        <div className="flex items-center py-2 space-x-1 cursor-pointer md:mr-0">
            <div className="flex justify-center space-x-1">
                <span className="text-xl md:text-xl font-bold text-red">SAIGON</span>
                <span className="text-xl md:text-xl font-bold text-white">360</span>
            </div>
        </div>
    );
}
