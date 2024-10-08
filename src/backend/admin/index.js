//dashboard notice
import './index.scss';

jQuery(document).ready(function($) {
    $('.gtb-notice-action a').on('click', function(e) {
        e.preventDefault();
        $(this).prop('disabled', true);
        $(this).off('click');
        $(this).text('Loading').addClass('process');
        $.ajax({
            url: gtb_ajax_obj.ajax_url,
            type: 'post',
            data: {
                action: 'gtb_install_plugin',
                nonce: gtb_ajax_obj.nonce
            },
            success: function(response) {
                if (response.success) {
                    $('.gtb-notice-action a').text('Activated').removeClass('process').addClass('success');
                    location.reload();
                } else {
                    $('.gtb-notice-action a').text('Install Gutenverse').removeClass('process');
                    location.reload();
                }
            }
        });
    });
});

(function($) {
    $('.gutenverse-upgrade-notice.page-content-upgrade.plugin-notice .close-notif').on('click', function() {
        $.post( ajaxurl, {
            action: 'gtb_plugin_notice_close'
        } );

        $('.gutenverse-upgrade-notice.page-content-upgrade.plugin-notice').fadeOut();
    });
})(jQuery);