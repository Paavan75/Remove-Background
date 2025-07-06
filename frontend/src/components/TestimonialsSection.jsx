const testimonials = [
  {
    quote: "We are impressed by the AI and think it's the best choice on the market.",
    name: 'Emil Barsø Rheinlænder',
    title: 'Content & Marketing Coordinator',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: 'remove.bg is leaps and bounds ahead of the competition. A thousand times better. It simplified the whole process.',
    name: 'Marc Cohen',
    title: 'CEO',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
  },
  {
    quote: 'We were impressed by its ability to account for pesky, feathery hair without making an image look jagged and amateurish.',
    name: 'Taylor Hatmaker',
    title: 'Senior Technology Editor',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const TestimonialsSection = () => (
  <section className="w-full py-20 px-4 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 relative overflow-hidden">
    {/* Doodle accents */}
    <svg className="absolute left-0 top-0 w-40 h-40 opacity-30" viewBox="0 0 200 200"><path d="M50,100 Q75,50 100,100 T150,100" stroke="#FDE047" strokeWidth="8" fill="none"/><circle cx="30" cy="30" r="8" fill="#FDE047"/></svg>
    <svg className="absolute right-0 bottom-0 w-40 h-40 opacity-30" viewBox="0 0 200 200"><path d="M50,100 Q75,150 100,100 T150,100" stroke="#FDE047" strokeWidth="8" fill="none"/><circle cx="170" cy="170" r="8" fill="#FDE047"/></svg>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">They love us. You will too.</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-yellow-100">
            <blockquote className="text-lg text-slate-700 font-medium mb-6">“{t.quote}”</blockquote>
            <div className="flex items-center gap-3 mt-auto">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-yellow-300" />
              <div className="text-left">
                <div className="font-bold text-slate-900 text-base">{t.name}</div>
                <div className="text-slate-500 text-sm">{t.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href="#" className="text-yellow-700 font-semibold hover:underline text-lg">Read Success Stories &rarr;</a>
      </div>
    </div>
  </section>
);

export default TestimonialsSection; 