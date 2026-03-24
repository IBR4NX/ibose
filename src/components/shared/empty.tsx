import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconBell } from "@tabler/icons-react";
import { MoveLeft, RefreshCcwIcon } from "lucide-react";
import LinkButton from "./ui/link-button";

export function EmptyMuted() {
	return (
		<Empty className="h-full bg-muted/30">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<IconBell />
				</EmptyMedia>
				<EmptyTitle>404 - Page Not Found</EmptyTitle>
				<EmptyDescription className="max-w-xs text-pretty">
					عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="outline">
					<RefreshCcwIcon />
					Refresh
				</Button>

					<LinkButton
						href="javascript:history.back()"
						variant="outline"
						size="lg"
						className="gap-2"
					>
						<MoveLeft className="w-4 h-4" />
						العودة للخلف
					</LinkButton>
			</EmptyContent>
		</Empty>
	);
}
