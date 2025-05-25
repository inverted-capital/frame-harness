import { ScreenSize, BackgroundType, TestHarnessActions } from '../../types'
import {
  Smartphone,
  Tablet,
  Monitor,
  Square,
  type LucideIcon
} from 'lucide-react'

interface DisplayOptionsProps {
  screenSize: ScreenSize
  setScreenSize: TestHarnessActions['setScreenSize']
  background: BackgroundType
  setBackground: TestHarnessActions['setBackground']
  showBorder: boolean
  toggleBorder: TestHarnessActions['toggleBorder']
}

const screenOptions: { type: ScreenSize; label: string; Icon: LucideIcon }[] = [
  { type: 'mobile', label: 'Mobile', Icon: Smartphone },
  { type: 'tablet', label: 'Tablet', Icon: Tablet },
  { type: 'desktop', label: 'Desktop', Icon: Monitor }
]

const backgroundOptions: {
  type: BackgroundType
  label: string
  Sample: () => JSX.Element
}[] = [
  {
    type: 'white',
    label: 'White',
    Sample: () => (
      <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
    )
  },
  {
    type: 'checkered',
    label: 'Checkered',
    Sample: () => (
      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-2 bg-gray-300"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-300"></div>
      </div>
    )
  }
]

const DisplayOptions: React.FC<DisplayOptionsProps> = ({
  screenSize,
  setScreenSize,
  background,
  setBackground,
  showBorder,
  toggleBorder
}) => (
  <div className="space-y-4">
    <h2 className="section-heading">
      Display Options
    </h2>
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Screen Size</h3>
      <div className="flex gap-3">
        {screenOptions.map(({ type, label, Icon }) => (
          <button
            key={type}
            onClick={() => setScreenSize(type)}
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg transition-colors ${
              screenSize === type
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Icon size={24} />
            <span className="mt-1 text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Background</h3>
      <div className="flex gap-2">
        {backgroundOptions.map(({ type, label, Sample }) => (
          <button
            key={type}
            onClick={() => setBackground(type)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              background === type
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Sample />
            <span className="text-sm">{label}</span>
          </button>
        ))}
        <button
          onClick={toggleBorder}
          className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
            showBorder
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Square size={16} />
          <span className="text-sm">
            {showBorder ? 'Hide Border' : 'Show Border'}
          </span>
        </button>
      </div>
    </div>
  </div>
)

export default DisplayOptions
