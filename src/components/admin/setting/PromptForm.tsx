import TextArea from 'antd/es/input/TextArea';
import { IPrompt } from './Prompt';
import {
  AIOptions,
  AIPrompt,
  getAIParameters,
  putAIOptions,
  putAIPrompt,
} from 'api/prompt';
import { ChangeEvent, useEffect, useState } from 'react';
import { Dropdown, MenuProps } from 'antd';

const MODEL_CONFIG: { key: keyof AIOptions; name: string; value: any }[] = [
  {
    key: 'temperature',
    name: 'Temperature',
    value: null,
  },
  {
    key: 'maxTokens',
    name: 'Max Tokens',
    value: null,
  },
  {
    key: 'stop',
    name: 'Stop sequences',
    value: null,
  },
  {
    key: 'topP',
    name: 'Top P',
    value: null,
  },
  {
    key: 'frequencyPenalty',
    name: 'Frequency penalty',
    value: null,
  },
  {
    key: 'presencePenalty',
    name: 'Presence penalty',
    value: null,
  },
];

interface PromptFormProps {
  prompt: IPrompt;
  allParameters: MenuProps['items'];
}

const PromptForm = ({ prompt, allParameters }: PromptFormProps) => {
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [modelConfig, setModelConfig] = useState(MODEL_CONFIG);
  const [userPrompt, setUserPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  const initModelConfig = () => {
    const updatedModelConfig = MODEL_CONFIG.map((config) => ({
      ...config,
      value: prompt?.option[config.key] ?? 0,
    }));

    setModelConfig(updatedModelConfig);
  };

  const handleParameterClick =
    (index: number): MenuProps['onClick'] =>
    (e) => {
      setSelectedParameters((prev) => {
        const updatedParameters = [...prev];
        updatedParameters[index] = e.key;
        return updatedParameters;
      });
      console.log('Updated parameter:', e.key, 'at index:', index);
    };

  const handleAddParameterClick = () => {
    setSelectedParameters((prev) => {
      if (prev.length > 0 && prev[prev.length - 1] === '') {
        return prev;
      }
      return [...prev, ''];
    });
  };

  const handleModelConfigChange =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setModelConfig((prev) => {
        const updatedModelConfig = prev.map((config) => {
          if (config.key === key) {
            return { ...config, value: e.target.value };
          }
          return config;
        });
        return updatedModelConfig;
      });
    };

  const getParametersPayload = (): AIPrompt => {
    const payload = {
      provider: 'OPENAI',
      model: 'model',
      system: systemPrompt || prompt.system,
      user: userPrompt || prompt.user,
      parameters: selectedParameters,
    };

    return payload;
  };

  const getModelConfigPayload = () => {
    let hasMissingValue = false;

    const payload = modelConfig.reduce((acc, item) => {
      if (item.key !== 'stop' && !item.value) {
        alert(`⚠️ ${item.name} 값이 없습니다.`);
        hasMissingValue = true;
      }
      acc[item.key as keyof AIOptions] =
        item.value ?? (item.key === 'stop' ? [] : 0);
      return acc;
    }, {} as AIOptions);

    if (hasMissingValue) return null;
    return payload;
  };

  const handleSaveClick = async (promptId: number) => {
    const parametersPayload = getParametersPayload();
    const modelConfigPayload = getModelConfigPayload();

    if (!parametersPayload || !modelConfigPayload) return;

    if (modelConfigPayload && parametersPayload) {
      try {
        await Promise.all([
          putAIPrompt(promptId, parametersPayload),
          putAIOptions(promptId, modelConfigPayload),
        ]);

        alert('✅ 설정이 변경되었습니다.');
      } catch (error) {
        alert(`⛔ 요청 중 에러가 발생했습니다: ${error}`);
      }
    }
  };

  useEffect(() => {
    initModelConfig();
  }, [prompt?.option]);

  useEffect(() => {
    setSelectedParameters(prompt?.parameters);
  }, [prompt]);

  const userPromptValue = userPrompt ? userPrompt : prompt?.user;
  const systemPromptValue = systemPrompt ? systemPrompt : prompt?.system;

  return (
    <section className="flex w-full flex-col gap-y-4 rounded-lg bg-gray-100 p-4 sm:w-1/2">
      <h2 className="text-heading-3">프롬프트 {prompt?.type}</h2>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-solo-label-pc">User (required)</h3>
        <TextArea
          rows={6}
          value={userPromptValue}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-solo-label-pc">System (required)</h3>
        <TextArea
          rows={6}
          value={systemPromptValue}
          onChange={(e) => setSystemPrompt(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-solo-label-pc">Settings (optional)</h3>
        <div className="flex gap-x-3">
          <div className="flex w-1/2 flex-col gap-y-2 rounded border bg-white p-4">
            <h4 className="solo-label border-b">%s</h4>
            <div>
              <ul className="flex flex-col gap-y-2">
                {selectedParameters?.map((param, index) => {
                  const n = index + 1;
                  const suffix =
                    n % 100 >= 11 && n % 100 <= 13
                      ? 'th'
                      : ['st', 'nd', 'rd'][(n % 10) - 1] || 'th';
                  return (
                    <li key={index} className="flex w-full justify-between">
                      <span className="w-1/5">{`${n}${suffix}`}</span>
                      <div className="w-4/5">
                        <Dropdown
                          menu={{
                            items: allParameters,
                            onClick: handleParameterClick(index),
                          }}
                          trigger={['click']}
                        >
                          <button className="flex w-full justify-between">
                            <span>{param}</span>
                            <span>▾</span>
                          </button>
                        </Dropdown>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button
                className="w-full rounded-lg bg-gray-50 py-2 hover:bg-gray-100"
                onClick={() => handleAddParameterClick()}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-y-2 rounded border bg-white p-4">
            <h4 className="solo-label border-b">Model Configuration</h4>
            <ul className="flex flex-col gap-y-1">
              {modelConfig?.map((config) => (
                <li key={config.key} className="flex w-full justify-between">
                  <span className="w-2/3">{config.name}</span>
                  <input
                    className="w-1/3 text-right"
                    value={config.value ?? 0}
                    type="number"
                    onChange={handleModelConfigChange(config.key)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-y-3">
        <button
          className="rounded border border-gray-3 bg-blue-50 px-8 py-2 font-bold hover:bg-blue-100"
          type="button"
          onClick={() => handleSaveClick(prompt?.id)}
        >
          저장
        </button>
        <div className="flex gap-x-1">
          <span className="text-caption font-bold">
            가장 최근 업데이트 날짜 :
          </span>
          <span className="text-caption font-bold">
            The key does not exist in the server response
          </span>
        </div>
      </div>
    </section>
  );
};

export default PromptForm;
