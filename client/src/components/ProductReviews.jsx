import { Star, StarBorder } from '@mui/icons-material';
import { useState } from 'react';

const ratingsData = [
    { stars: 5, count: 2823 },
    { stars: 4, count: 38 },
    { stars: 3, count: 4 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
];

const totalReviews = ratingsData.reduce((sum, item) => sum + item.count, 0);
const averageRating = 4.5;

// Add more fake reviews
const mockReviews = [
    {
        id: 1,
        user: 'Darrell Steward',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'This is amazing product I have.',
        date: 'July 2, 2020 03:29 PM',
        likes: 128,
    },
    {
        id: 2,
        user: 'Darlene Robertson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'This is amazing product I have.',
        date: 'July 2, 2020 1:04 PM',
        likes: 82,
    },
    {
        id: 3,
        user: 'Kathryn Murphy',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        text: 'This is amazing product I have.',
        date: 'June 26, 2020 10:03 PM',
        likes: 9,
    },
    {
        id: 4,
        user: 'Ronald Richards',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        rating: 5,
        text: 'This is amazing product I have.',
        date: 'July 7, 2020 11:41 AM',
        likes: 124,
    },
    {
        id: 5,
        user: 'Jane Cooper',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 4,
        text: 'Good quality, but delivery was slow.',
        date: 'July 8, 2020 09:15 AM',
        likes: 23,
    },
    {
        id: 6,
        user: 'Cody Fisher',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        rating: 3,
        text: 'Average product, expected more.',
        date: 'July 9, 2020 12:30 PM',
        likes: 5,
    },
    {
        id: 7,
        user: 'Esther Howard',
        avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
        rating: 4,
        text: 'Nice, but color was a bit off.',
        date: 'July 10, 2020 03:45 PM',
        likes: 12,
    },
    {
        id: 8,
        user: 'Guy Hawkins',
        avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
        rating: 5,
        text: 'Perfect fit and great material!',
        date: 'July 11, 2020 11:20 AM',
        likes: 44,
    },
    {
        id: 9,
        user: 'Brooklyn Simmons',
        avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
        rating: 2,
        text: 'Not satisfied with the stitching.',
        date: 'July 12, 2020 08:10 AM',
        likes: 2,
    },
    {
        id: 10,
        user: 'Wade Warren',
        avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
        rating: 5,
        text: 'Absolutely love it! Highly recommend.',
        date: 'July 13, 2020 06:55 PM',
        likes: 67,
    },
]

export default function ProductReviews() {
    const [page, setPage] = useState(1);
    const reviewsPerPage = 4;
    const totalPages = Math.ceil(mockReviews.length / reviewsPerPage);
    const paginated = mockReviews.slice((page - 1) * reviewsPerPage, page * reviewsPerPage);

    return (
        <div className="mx-auto p-1 mt-5 mb-10">
            {/* Top Summary */}
            <div className="flex gap-6 border rounded-md p-6 shadow-sm" style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#e5e7eb', borderRadius: '12px', borderSpacing: '30px' }}>
                {/* Average Rating Circle */}
                <div className="flex flex-col items-center justify-center w-1/4">
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full">
                            <circle
                                className="text-gray-200"
                                strokeWidth="6"
                                stroke="currentColor"
                                fill="transparent"
                                r="30"
                                cx="40"
                                cy="40"
                            />
                            <circle
                                className="text-yellow-500"
                                strokeWidth="6"
                                strokeDasharray={`${averageRating * 20}, 100`}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="30"
                                cx="40"
                                cy="40"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                            {averageRating}
                        </div>
                    </div>
                    <div className="flex items-center mt-2 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} fontSize="small" />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">from 1.25k reviews</p>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-2">
                    {ratingsData.map(({ stars, count }) => (
                        <div key={stars} className="flex items-center gap-2">
                            <span className="text-sm w-6">{stars}.0</span>
                            <Star fontSize="small" className="text-yellow-500" />
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-black rounded-full"
                                    style={{ width: `${(count / totalReviews) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs w-10 text-right">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filters and Review Tabs */}
            <div className="flex gap-6 mt-10">
                {/* Filter Section */}
                <div className="w-1/3 rounded-md p-4 space-y-4" style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#e5e7eb', borderRadius: '12px', borderSpacing: '100px', maxHeight: '400px' }}>
                    <div>
                        <p className="font-semibold mb-2" style={{ borderBottom: '2px dashed #e5e7eb' }}>Reviews Filter</p>
                        <div>
                            <details open>
                                <summary className="font-medium cursor-pointer">Rating</summary>
                                <div className="mt-2 space-y-1">
                                    {[5, 4, 3, 2, 1].map((s) => (
                                        <label key={s} className="flex items-center gap-2 text-sm">
                                            <input type="checkbox" className="accent-yellow-500" />
                                            <Star fontSize="small" className="text-yellow-500" />
                                            {s}
                                        </label>
                                    ))}
                                </div>
                            </details>
                        </div>
                    </div>

                    <div>
                        <details open>
                            <summary className="font-medium cursor-pointer" style={{ borderBottom: '2px dashed #e5e7eb' }}>Review Topics</summary>
                            <div className="mt-2 space-y-1 text-sm">
                                {[
                                    'Product Quality',
                                    'Seller Services',
                                    'Product Price',
                                    'Shipment',
                                    'Match with Description',
                                ].map((topic) => (
                                    <label key={topic} className="flex items-center gap-2">
                                        <input type="checkbox" className="accent-yellow-500" />
                                        {topic}
                                    </label>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>

                {/* Review Tabs */}
                <div className="flex-1">
                    <p className="font-semibold mb-2">Review Lists</p>
                    <div className="flex gap-2 flex-wrap mb-6">
                        {['All Reviews', 'With Photo & Video', 'With Description'].map(tab => (
                            <button key={tab} className="px-3 py-1 border rounded-full text-sm hover:bg-gray-100">{tab}</button>
                        ))}
                    </div>
                    <div className="flex flex-col gap-6">
                        {paginated.map(r => (
                            <div key={r.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 mb-2">
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="flex mb-1">
                                        {Array.from({ length: 5 }).map((_, i) =>
                                            i < r.rating ? <Star key={i} fontSize="small" className="text-yellow-500" /> : <StarBorder key={i} fontSize="small" className="text-yellow-500" />
                                        )}
                                    </span>
                                    <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full border mb-1" />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="font-semibold mb-1">{r.text}</div>
                                    <div className="text-xs text-gray-400 mb-1">{r.date}</div>
                                    <div className="text-sm font-medium text-gray-700">{r.user}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2 min-w-[60px]">
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600"><span role="img" aria-label="like">👍</span> {r.likes}</button>
                                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600"><span role="img" aria-label="comment">💬</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-2">
                        <button className="px-3 py-1 border rounded bg-white" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>&lt;</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i + 1} className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="px-3 py-1 border rounded bg-white" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}