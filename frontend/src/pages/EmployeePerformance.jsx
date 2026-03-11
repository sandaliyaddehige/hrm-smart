import { useState } from "react";

const metrics = [
  { label: "KPI Score", value: 92, color: "bg-blue-600" },
  { label: "Task Completion Rate", value: 88, color: "bg-blue-500" },
  { label: "Attendance Percentage", value: 98, color: "bg-green-500" },
];

const ratingOptions = ["Exceeds Expectations", "Meets Expectations", "Below Expectations", "Outstanding"];

export default function Performance() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("Exceeds Expectations");
  const [hoverDot, setHoverDot] = useState(null);
  const collaborationRating = 4;

  return (
    <div className="max-w-4xl">
      {/* Employee card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
        <div className="flex gap-10">
          {/* Left: Employee info */}
          <div className="flex flex-col items-center min-w-[180px]">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-2xl font-bold text-blue-300 mb-4">
              JS
            </div>
            <h2 className="text-xl font-bold text-gray-800">John Silva</h2>
            <p className="text-sm text-gray-400 mt-1">Software Engineer</p>
            <p className="text-xs text-gray-300 mt-0.5">IT Department</p>
            <div className="mt-4 flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">
              <span className="text-blue-500">▲</span> 4.5 / 5
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="flex-1 space-y-6">
            {metrics.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">{m.label}</span>
                  <span className="text-sm font-bold text-gray-800">{m.value}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.color} transition-all duration-700`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Collaboration */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Team Collaboration Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <button
                    key={dot}
                    onMouseEnter={() => setHoverDot(dot)}
                    onMouseLeave={() => setHoverDot(null)}
                    className={`w-7 h-7 rounded-full transition-all ${
                      dot <= (hoverDot || collaborationRating)
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments & Rating */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Manager Comments</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Enter your feedback here..."
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Performance Rating</label>
            <div className="relative">
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-white cursor-pointer"
              >
                {ratingOptions.map(r => <option key={r}>{r}</option>)}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                Save Review
              </button>
              <button className="flex-1 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}