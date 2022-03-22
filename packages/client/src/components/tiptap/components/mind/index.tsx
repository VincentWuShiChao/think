import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { useCallback, useEffect, useRef } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconMinus, IconPlus } from '@douyinfe/semi-icons';
import { Resizeable } from 'components/resizeable';
import deepEqual from 'deep-equal';
// @ts-ignore
import jsMind from './jsmind.jsx';
import styles from './index.module.scss';

export const MindWrapper = ({ editor, node, updateAttributes }) => {
  const $container = useRef();
  const $mind = useRef<any>();
  const isEditable = editor.isEditable;
  const { data, width, height = 100 } = node.attrs;

  const zoomIn = useCallback(() => {
    const jm = $mind.current;
    if (!jm) return;

    jm.view.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    const jm = $mind.current;
    if (!jm) return;

    jm.view.zoomOut();
  }, []);

  const syncData = useCallback(() => {
    const jm = $mind.current;
    if (!jm) return;
    const data = jm.get_data();
    try {
      updateAttributes({ data });
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!data) return;
    if (!data.meta) return;

    const onChange = (_, data) => {
      if (data.node) {
        syncData();
      }
    };

    setTimeout(() => {
      if ($mind.current) {
        const jm = $mind.current;
        const currentData = jm.get_data();
        const isEqual = deepEqual(currentData, data);
        if (!isEqual) {
          jm.show(data);
        }
        return;
      }

      const options = {
        container: $container.current,
        editable: isEditable,
        view: {
          hmargin: 100,
          vmargin: 50,
          line_width: window.devicePixelRatio,
          line_color: '#e5e9ef',
        },
      };
      const jm = new jsMind(options);
      jm.show(data);
      $mind.current = jm;
      jm.add_event_listener(onChange);
    }, 0);
  }, [data, isEditable]);

  const onResize = (size) => {
    const jm = $mind.current;
    if (!jm) return;
    updateAttributes({ width: size.width, height: size.height });
    setTimeout(() => {
      jm.view.show(true);
      jm.view.showAddHandlerDOMNode();
    }, 100);
  };

  useEffect(() => {
    const jm = $mind.current;
    if (!jm) return;

    if (isEditable) {
      jm.enable_edit();
    } else {
      jm.disable_edit();
    }
  }, [isEditable]);

  const content = (
    <div ref={$container} className={styles.renderWrap} tabIndex={0} style={{ width: '100%', height: '100%' }}>
      {!isEditable && (
        <div className={styles.mindHandlerWrap}>
          <Button
            size="small"
            theme="borderless"
            type="tertiary"
            icon={<IconMinus style={{ fontSize: 14 }} />}
            onClick={zoomOut}
          />
          <Button
            size="small"
            theme="borderless"
            type="tertiary"
            icon={<IconPlus style={{ fontSize: 14 }} />}
            onClick={zoomIn}
          />
        </div>
      )}
    </div>
  );

  return (
    <NodeViewWrapper className={styles.wrap}>
      <NodeViewContent as="div">
        {isEditable ? (
          <Resizeable width={width} height={height} onChange={onResize}>
            {content}
          </Resizeable>
        ) : (
          <div style={{ display: 'inline-block', width, height }}>{content}</div>
        )}
      </NodeViewContent>
    </NodeViewWrapper>
  );
};
