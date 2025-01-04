import React from 'react'

export default function RefundPolicy() {
    return (
        <div>
            <div className="bg-gray-100 m-2 text-gray-800">
                <div id="refund-policy" className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-10">
                    <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">ফেরত নীতিমালা</h1>
                    <ul className="list-disc ml-5 space-y-4 text-gray-700">
                        <li><strong>স্টক সমস্যা:</strong> যদি স্টক সমস্যার কারণে পণ্য সরবরাহ ব্যর্থ হয় বা প্রাকৃতিক দুর্যোগ ঘটে, তাহলে ৩-৫ কর্মদিবসের মধ্যে গ্রাহক তার অর্থ ফেরত পাবেন।</li>
                        <li><strong>প্রিপেমেন্ট ফেরত:</strong> প্রিপেইড অর্ডার সেবা প্রদানে ব্যর্থ হলে গ্রাহকের অর্থ একই পেমেন্ট পদ্ধতিতে ফেরত দেওয়া হবে।</li>
                        <li><strong>নীতিমালা আপডেট:</strong> এই নীতিমালার যেকোনো পরিবর্তন এই পৃষ্ঠায় প্রকাশ করা হবে এবং "শেষ আপডেট" তারিখ উল্লেখ করা হবে।</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
