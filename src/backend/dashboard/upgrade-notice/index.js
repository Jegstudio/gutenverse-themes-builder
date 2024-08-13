
import { addFilter } from '@wordpress/hooks';
import { ContentV100 } from './version/v1-0-0';

export const loadUpgradeNotice = () => {addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse-themes-builder') {
                switch (version) {
                    case '1.0.0':
                        content = <ContentV100 />;
                        break;
                }
            }

            return content;
        }
    );
};