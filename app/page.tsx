import Workout from './_components/Workout';
import fetest from './_data/fetest.json';
import type { WorkoutData } from './_components/Workout';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <main className="container mx-auto px-4 py-8">
        <Workout workout={fetest as WorkoutData} />
      </main>
    </div>
  );
}
