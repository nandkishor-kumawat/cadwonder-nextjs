import { siteMetadata } from '@/lib/siteMetaData';
import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                    Welcome to CadWonder. By accessing and using this website, you agree to comply with the following terms and conditions.
                    If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Use of the Website</h2>
                <p>
                    This website allows users to browse and purchase answers to specific questions by paying a fee.
                    All content, including questions and answers, is owned by CadWonder and cannot be reproduced or used for commercial purposes without our permission.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Purchasing Answers</h2>
                <p>
                    Users may purchase answers by paying the fee specified for each question. Upon successful payment, users will gain access to the corresponding answer.
                    All prices are listed in Indian Rupees (INR) and are subject to change without prior notice.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Refunds and Cancellations</h2>
                <p>
                    Due to the nature of digital content, all purchases made on CadWonder are final and non-refundable. However, if you experience technical
                    issues that prevent you from accessing purchased content, please contact our support team, and we will resolve the issue promptly.
                </p>
                <p className="mt-4">
                    In cases where a refund is applicable (e.g., duplicate payments), refunds will be processed within 5-7 working days and credited to the original
                    payment method used by the customer.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                <p>
                    The content and services provided on CadWonder are for informational and educational purposes only.
                    We strive to ensure that the questions and answers posted are accurate and up to date, but we make no representations
                    or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability
                    of the information on the site.
                </p>
                {/* <p className="mt-4">
                    CadWonder will not be held responsible for any errors, omissions, or delays in the content or for any losses,
                    injuries, or damages arising from its use. The use of the content and reliance on any information obtained from
                    this website is solely at your own risk.
                </p> */}
                <p className="mt-4">
                    We reserve the right to modify, remove, or discontinue the services or content without prior notice. Any legal
                    decisions or outcomes based on information provided on this website are the sole responsibility of the user.
                </p>
            </section>


            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p>
                    We are committed to protecting your privacy. Please review our <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a> for details on how we collect, use, and disclose your personal information.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
                <p>
                    CadWonder reserves the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting on the website.
                    Your continued use of the website after any changes will constitute your acknowledgment and acceptance of the modified terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p>
                    If you have any questions or concerns about these Terms and Conditions, please contact us at:
                </p>
                <ul className="list-disc ml-6 mt-2">
                    <li>Email:&nbsp;
                        <a
                            style={{ all: 'unset', color: 'blue', cursor: 'pointer' }}
                            href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
                    </li>
                    <li>Phone:&nbsp;
                        <a
                            style={{ all: 'unset', color: 'blue', cursor: 'pointer' }}
                            href={`tel:${siteMetadata.phone}`}>{siteMetadata.phone}</a>
                    </li>
                    <li>Address: {siteMetadata.address}</li>
                </ul>
            </section>
        </div>
    );
};

export default TermsAndConditions;
