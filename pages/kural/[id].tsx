import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchKural } from '@/lib/api';

const KuralDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [kural, setKural] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchKural(Number(id)).then(setKural).catch(console.error);
    }
  }, [id]);

  if (!kural) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 font-serif">
      <h1 className="text-2xl font-bold mb-2">குறள் {kural.kural_number}</h1>
      <p className="text-lg mb-1">{kural.kural_tamil_line1}</p>
      <p className="text-lg mb-4">{kural.kural_tamil_line2}</p>

      <p className="text-gray-700 italic">{kural.kural_english_line1}</p>
      <p className="text-gray-700 italic">{kural.kural_english_line2}</p>
    </div>
  );
};

export default KuralDetail;
