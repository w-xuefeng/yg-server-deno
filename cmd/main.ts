import bootstrap from "../web/entry.ts";
import infraBoot from "../infrastructure/main.ts";
import fsBoot from "../file-system/main.ts";
import ucBoot from "../user-center/main.ts";
import gatewayBoot from "../gateway/main.ts";

gatewayBoot();
infraBoot();
fsBoot();
ucBoot();
bootstrap();
