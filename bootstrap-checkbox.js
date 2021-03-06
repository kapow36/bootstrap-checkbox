(function ($)
{
    $.fn.bootstrapCheckbox = function (action, value)
    {
        if (!action)
        {
            return this.each(function ()
            {
                var checkbox = $(this);
                if (!checkbox.is("input[type=checkbox]"))
                {
                    if (checkbox.parents(".btn-bootstrap-checkbox").length)
                    {
                        return;
                    }
                    else
                    {
                        throw "bootstrap-checkbox must be a input with type checkbox";
                    }
                }

                //properties
                var isChecked = checkbox.prop('checked');
                var text = checkbox.data("text");
                var contextualClass = checkbox.data("context-class") ? checkbox.data("context-class") : "default";
                var isBlock = checkbox.data("is-block") ? checkbox.data("is-block") : false;

                //generate html
                checkbox.attr("type", "hidden");
                checkbox.prop("checked", isChecked);
                checkbox.wrap("<label class='btn btn-" + contextualClass + " btn-bootstrap-checkbox " + (isChecked === true ? "" : "unchecked") + "' style='text-align:left !important;" + (isBlock === true ? " display: block; width: 100%;" : "") + "' title='" + text + "'></label>");
                checkbox.after("&nbsp;" + text);
                if (isChecked)
                {
                    checkbox.after("<span class='glyphicon glyphicon-check'></span>");
                }
                else
                {
                    checkbox.after("<span class='glyphicon glyphicon-unchecked'></span>");
                }

                //click event
                checkbox.parent().click(function (event)
                {
                    if (event.target.tagName !== "INPUT")
                    {
                        event.stopPropagation();
                        checkbox.bootstrapCheckbox("toggle");
                    }
                });
            });
        }
        else if (action === "check")
        {
            var label = this.parents(".btn-bootstrap-checkbox");
            if (value === true)
            {
                label.removeClass("unchecked");
                label.find("span").removeClass("glyphicon-unchecked").addClass("glyphicon-check");
                this.prop("checked", true);
                this.trigger("change");
            }
            else if (value === false)
            {
                label.addClass("unchecked");
                label.find("span").removeClass("glyphicon-check").addClass("glyphicon-unchecked");
                this.prop("checked", false);
                this.trigger("change");
            }
            else
            {
                return this.next().hasClass("glyphicon-check");
            }
            return this;
        }
        else if (action === "toggle")
        {
            return this.bootstrapCheckbox("check", !this.next().hasClass("glyphicon-check"));
        }
        else
        {
            throw action + " does not exist for $.bootstrapCheckbox()";
        }
    };
}(jQuery));

$(document).ready(function ()
{
    $(".bootstrap-checkbox").bootstrapCheckbox();
});
