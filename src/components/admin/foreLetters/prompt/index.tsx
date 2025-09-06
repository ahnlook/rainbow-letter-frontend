import { MenuProps, Radio, Switch } from 'antd';
import {
  AIOptions,
  getAIParameters,
  getForeLetterAIConfig,
  PromptType,
  putForeLetterAIConfig,
} from 'api/prompt';
import { useEffect, useState } from 'react';
import PromptForm from '../../setting/PromptForm';

export interface IPrompt {
  configId: number;
  id: number;
  model: string;
  option: AIOptions;
  parameters: string[];
  provider: string;
  system: string;
  type: PromptType;
  user: string;
}

const ForeLettersPrompt = () => {
  const [mainPrompt, setMainPrompt] = useState<PromptType>('A');
  const [isABTestOn, setIsABTestOn] = useState(false);
  const [allParameters, setAllParameters] = useState<MenuProps['items']>([]);
  const [prompts, setPrompts] = useState<IPrompt[]>([]);

  const promptA = prompts.find((prompt) => prompt.type === 'A') as IPrompt;
  const promptB = prompts.find((prompt) => prompt.type === 'B') as IPrompt;

  const handleGetAIConfig = async () => {
    const response = await getForeLetterAIConfig();
    const config = response.config;
    const prompts = response.prompts;

    setIsABTestOn(config.useABTest);
    setMainPrompt(config.selectPrompt);
    setPrompts(prompts);
  };

  const changeAIConfig = async (config: {
    useABTest: boolean;
    selectPrompt: PromptType;
  }) => {
    try {
      await putForeLetterAIConfig(config);
      alert('설정이 변경되었습니다.');
    } catch (error) {
      alert(error);
    }
  };

  const handleMainPromptChange = (value: PromptType) => {
    setMainPrompt(() => {
      const updatedPrompt = value;
      changeAIConfig({ useABTest: isABTestOn, selectPrompt: updatedPrompt });
      return updatedPrompt;
    });
  };

  const handleABTestToggle = () => {
    setIsABTestOn((prev) => {
      const updatedABTestOn = !prev;
      changeAIConfig({ useABTest: updatedABTestOn, selectPrompt: mainPrompt });
      return updatedABTestOn;
    });
  };

  const setParameters = async () => {
    const response = await getAIParameters();
    const AIParameters = response.parameters.map((param: string) => ({
      key: param,
      label: param,
    }));
    setAllParameters(AIParameters);
  };

  useEffect(() => {
    setParameters();
    handleGetAIConfig();
  }, []);

  return (
    <main className="flex flex-col gap-y-5 pb-5">
      <section className="flex w-full min-w-[37.5rem] flex-col gap-y-3 rounded-lg bg-gray-100 p-5 text-solo-label">
        <div className="flex items-center gap-x-2">
          <span className="">메인 프롬프트</span>
          <Radio.Group
            name="promptGroup"
            defaultValue={'A'}
            value={mainPrompt}
            onChange={(e) => handleMainPromptChange(e.target.value)}
          >
            <Radio value={'A'}>A</Radio>
            <Radio value={'B'}>B</Radio>
          </Radio.Group>
        </div>
        <div className="flex items-center gap-2">
          <span>A/B 테스트</span>
          <Switch
            className={`${isABTestOn ? 'bg-primary' : 'bg-gray-300'}`}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            checked={isABTestOn}
            onChange={handleABTestToggle}
          />
        </div>
      </section>
      <div className="flex flex-col gap-x-4 rounded-lg sm:flex-row">
        <PromptForm prompt={promptA} allParameters={allParameters} />
        <PromptForm prompt={promptB} allParameters={allParameters} />
      </div>
    </main>
  );
};

export default ForeLettersPrompt;
