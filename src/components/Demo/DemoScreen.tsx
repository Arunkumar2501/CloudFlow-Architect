import React from 'react';
import { Button, Card, Typography, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import serverlessIcon from '../../assets/download (26).svg';
import migrateIcon from '../../assets/download (24).svg';
import docAsset from '../../assets/Vector.svg';
import plusAsset from '../../assets/Frame 1410126261.svg';

const { Title, Text } = Typography;

const options = [
  { label: 'Serverless ETL on AWS Glue', icon: serverlessIcon },
  { label: 'Migrate an on-premises', icon: migrateIcon },
  { label: 'Migrate an on-premises', icon: migrateIcon },
];

const PlusBadge: React.FC = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.89285 20.8929H38.8929M20.8929 2.89286V38.8929"
      stroke="#0527F9"
      strokeWidth="5.78571"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * DemoScreen replicates the provided Figma frame for the UI assessment
 * using Ant Design components styled with Tailwind utility classes.
 */
const DemoScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#dce9ff] via-[#e6f0ff] to-[#eaf2ff] relative overflow-hidden">
      {/* Subtle background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid" width="240" height="240" patternUnits="userSpaceOnUse">
            <path
              d="M60 0 L120 36 L180 0 L240 36 L240 96 L180 132 L240 168 L240 228 L180 264 L120 228 L60 264 L0 228 L0 168 L60 132 L0 96 L0 36 Z"
              fill="none"
              stroke="#c6d6f3"
              strokeWidth="1"
              opacity="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative w-full max-w-6xl px-6 py-8">
        <div className="mx-auto flex justify-center">
          <Card
            className="shadow-lg border border-[#e7ebf5] rounded-2xl"
            bodyStyle={{ padding: 24 }}
            style={{ width: 1020 }}
          >
            {/* Top progress / breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#7c8ba1] mb-5">
              <Text className="text-[11px] font-medium text-[#6e7d97]">Question 3/7</Text>
              <div className="h-[2px] flex-1 bg-[#dfe7f5] rounded-full overflow-hidden">
                <div className="h-[2px] w-[38%] bg-[#5b9bff]" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-6 items-stretch">
              {/* Illustration panel */}
              <div className="bg-gradient-to-br from-[#d8e4ff] via-[#d4dfff] to-[#dfe9ff] rounded-xl border border-[#dbe4fa] shadow-sm flex items-center justify-center min-h-[280px] px-4 py-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-[210px] h-[220px] bg-white rounded-2xl shadow-[0_10px_28px_rgba(31,107,255,0.2)] flex items-center justify-center">
                    <img src={docAsset} alt="Document" className="w-[170px] h-auto drop-shadow-[0_10px_28px_rgba(31,107,255,0.2)]" />
                  </div>
                  <img
                    src={plusAsset}
                    alt="Plus"
                    className="absolute -right-5 bottom-6 w-14 h-14 drop-shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </div>

              {/* Form column */}
              <div className="flex flex-col h-full">
                <Title level={4} className="!mb-3 !text-[20px] !font-semibold !text-[#1b2737]">
                  Where would you like to start?
                </Title>

                <div className="flex gap-2 mb-3">
                  <Button
                    type="primary"
                    className="!bg-[#1f6bff] hover:!bg-[#1c5fe0] !h-9 !px-3 !text-[13px] !font-medium rounded"
                  >
                    Start From Scratch
                  </Button>
                  <Button className="!h-9 !px-3 !text-[13px] !font-medium text-[#1b2737] rounded border border-[#d8deeb]">
                    Start with AI Beta
                  </Button>
                </div>

                <Text className="text-[12px] text-[#7a8598] leading-snug">
                  Or, these use cases are very popular. Discover more templates in the library later.
                </Text>

                <div className="mt-3 space-y-2">
                  {options.map((opt, idx) => (
                    <Button
                      key={idx}
                      block
                      className="!justify-start !h-11 border border-[#e5e9f2] hover:!border-[#1f6bff] !px-3 !flex !items-center !gap-3"
                      icon={<img src={opt.icon} alt="" className="w-5 h-5" />}
                    >
                      <span className="text-[13px] text-[#2f3b4c]">{opt.label}</span>
                    </Button>
                  ))}
                </div>

                <Divider className="!my-4" />

                <div className="flex justify-between">
                  <Button
                    icon={<LeftOutlined />}
                    className="!h-9 !px-3 !text-[13px] !font-medium text-[#1b2737] border border-[#d8deeb] rounded"
                  >
                    Previous
                  </Button>
                  <Button
                    type="primary"
                    className="!bg-[#1f6bff] hover:!bg-[#1c5fe0] !h-9 !px-4 !text-[13px] !font-medium rounded"
                  >
                    Let&apos;s start
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DemoScreen;

