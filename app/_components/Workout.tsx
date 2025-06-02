import React from 'react';

interface Duration {
  value: number;
  unit: string;
}

interface Block {
  type: 'duration_interval' | 'rest' | 'set';
  id: string;
  duration?: Duration;
  intensity?: string;
  note?: string;
  render: string;
  reps?: number;
  blocks?: Block[];
}

interface Segment {
  title: string;
  blocks: Block[];
}

export interface WorkoutData {
  _id: string;
  name: string;
  description: string;
  discipline: string;
  duration: Duration;
  segments: Segment[];
}

interface WorkoutProps {
  workout: WorkoutData;
}

const ClockIcon = () => (
  <svg
    className="w-4 h-4 mr-1 inline-block text-gray-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const ShoeIcon = () => (
  <svg
    className="w-4 h-4 mr-1 inline-block text-white"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M2 17c0-1.1.9-2 2-2h13.5c.28 0 .53.11.71.29l2.5 2.5c.63.63.19 1.71-.71 1.71H4a2 2 0 01-2-2zm2-4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h2.5c.28 0 .53.11.71.29l8.5 8.5c.63.63.19 1.71-.71 1.71H4zm16.5 2c.83 0 1.5-.67 1.5-1.5S21.33 12 20.5 12 19 12.67 19 13.5s.67 1.5 1.5 1.5z" />
  </svg>
);

type WorkoutHeaderProps = { workout: WorkoutData };

const WorkoutHeader = ({ workout }: WorkoutHeaderProps) => {
  return (
    <div className="mb-8 bg-gray-800 rounded-xl p-6 text-white shadow flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{workout.name}</h1>
        <span className="flex items-center bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          <ShoeIcon />
          running
        </span>
      </div>
      <p className="text-gray-200 mb-2">{workout.description}</p>
      <div className="flex items-center gap-6 text-sm">
        <span className="flex items-center text-gray-200">
          <ClockIcon />
          <span className="font-medium">Total Duration:</span>&nbsp;
          {workout.duration.value} {workout.duration.unit}
        </span>
      </div>
    </div>
  );
};

const intensityBarColors: Record<string, string> = {
  hard: 'bg-red-600',
  easy: 'bg-blue-600',
  recovery: 'bg-gray-500',
  fartlek: 'bg-yellow-500',
  default: 'bg-gray-500',
};

const intensityBadgeStyles: Record<string, string> = {
  hard: 'bg-red-500/80 text-white',
  easy: 'bg-blue-500/80 text-white',
  recovery: 'bg-gray-400/80 text-white',
  fartlek: 'bg-yellow-400/80 text-white',
  default: 'bg-gray-400/80 text-white',
};

function formatDuration(duration?: Duration) {
  if (!duration) return '';
  return `${duration.value} ${duration.unit}`;
}

function getBlockTitle(block: Block, segmentTitle?: string) {
  if (block.type === 'duration_interval') {
    if (
      block.intensity === 'easy' &&
      segmentTitle?.toLowerCase().includes('warm')
    )
      return 'Jog';
    if (
      block.intensity === 'easy' &&
      segmentTitle?.toLowerCase().includes('cool')
    )
      return 'Jog';
    if (block.intensity === 'easy') return 'Easy';
    if (block.intensity === 'hard') return 'Run';
    if (block.intensity === 'fartlek') return 'Fartlek';
    return 'Interval';
  }
  if (block.type === 'rest') return 'Rest';
  if (block.type === 'set') return '';
  return (
    String(block.type).charAt(0).toUpperCase() + String(block.type).slice(1)
  );
}

type BlockProps = { block: Block; segmentTitle?: string };

const Block = ({ block, segmentTitle }: BlockProps) => {
  let barColor =
    intensityBarColors[block.intensity || 'default'] ||
    intensityBarColors.default;
  let badgeColor =
    intensityBadgeStyles[block.intensity || 'default'] ||
    intensityBadgeStyles.default;
  if (
    block.intensity === 'easy' &&
    segmentTitle?.toLowerCase().includes('cool')
  ) {
    barColor = 'bg-green-600';
    badgeColor = 'bg-green-500/80 text-white';
  }
  if (block.intensity === 'recovery' || block.type === 'rest') {
    barColor = 'bg-gray-500';
    badgeColor = 'bg-gray-400/80 text-white';
  }

  if (block.type === 'set') {
    return (
      <div className="border border-gray-400 rounded-xl p-3 mb-4 bg-gray-900">
        <div className="text-lg font-semibold text-white mb-2">
          {block.reps ? `${block.reps} Times` : 'Set'}
        </div>
        <div className="flex flex-col gap-3">
          {block.blocks?.map((subBlock) => (
            <Block
              key={subBlock.id}
              block={subBlock}
              segmentTitle={segmentTitle}
            />
          ))}
        </div>
        {block.note && (
          <div className="text-xs italic text-gray-400 mt-2">{block.note}</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-stretch mb-3">
      <div className={`w-2 rounded-l-xl ${barColor}`}></div>
      <div className="flex-1 bg-gray-800 rounded-r-xl p-4 flex items-center justify-between">
        <div>
          <div className="text-white font-semibold text-lg">
            {getBlockTitle(block, segmentTitle)}
          </div>
          <div className="text-gray-300 text-sm">
            {formatDuration(block.duration)}
          </div>
          {block.note && (
            <div className="text-xs italic text-gray-400 mt-2">
              {block.note}
            </div>
          )}
        </div>
        {block.intensity && (
          <span
            className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${badgeColor}`}
          >
            {block.intensity}
          </span>
        )}
      </div>
    </div>
  );
};

type SegmentProps = { segment: Segment };

const Segment = ({ segment }: SegmentProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">{segment.title}</h2>
      <div className="space-y-2">
        {segment.blocks.map((block) => (
          <Block key={block.id} block={block} segmentTitle={segment.title} />
        ))}
      </div>
    </div>
  );
};

function Workout({ workout }: WorkoutProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-sm text-white">
      <WorkoutHeader workout={workout} />
      <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
        <div className="space-y-6">
          {workout.segments.map((segment) => (
            <Segment key={segment.title} segment={segment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workout;
