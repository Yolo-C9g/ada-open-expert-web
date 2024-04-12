<template>
    <Page class="staff">
        <template v-slot:setting>
            <SearchHeader>
                <template v-slot:search>
                    <div style="width: 240px;">
                        <span>员工姓名：</span>
                        <el-input v-model="enterpriseStaffPinia.query.username" placeholder="请输入" clearable></el-input>
                    </div>

                    <div style="width: 240px;">
                        <span>手机号：</span>
                        <el-input v-model="enterpriseStaffPinia.query.mobile" maxlength="11" placeholder="请输入"
                            clearable></el-input>
                    </div>
                </template>

                <template v-slot:buttons>
                   <div class="download-template"><a @click="enterpriseStaffPinia.onDownloadStaffTemplateAction">下载导入Excel模版</a></div>
                    <el-button plain style="width: 80px;" :disabled="enterpriseStaffPinia.loading" @click="enterpriseStaffPinia.onTrigleUploadAction">导入</el-button>
                    <el-button style="width: 80px;" :disabled="enterpriseStaffPinia.loading" @click="enterpriseStaffPinia.onTrigleAddStaffAction">新增</el-button>
                    <el-button plain type="primary" style="width: 80px;" :disabled="enterpriseStaffPinia.loading" @click="enterpriseStaffPinia.onSearchAction">查询</el-button>
                </template>
            </SearchHeader>
        </template>

        <template v-slot:content>
            <div class="container">
                <TableLayout :loading="enterpriseStaffPinia.loading" :data="enterpriseStaffPinia.staffList">
                    <el-table-column label="序号" width="120">
                        <template v-slot="scope">
                            <span class="list-title">{{ scope.$index + 1 + (enterpriseStaffPinia.query.pageNum - 1) * enterpriseStaffPinia.query.pageSize }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="员工姓名">
                        <template v-slot="scope">
                            <span class="list-title">{{ scope.row.username }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="手机号">
                        <template v-slot="scope">
                            <span class="list-title">{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="新增时间">
                        <template v-slot="scope">
                            <span class="list-title">{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template v-slot="scope">
                            <el-button type="danger" size="small" plain
                                @click="enterpriseStaffPinia.onDeleteStaffAction(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </TableLayout>

                <Paginationer 
                    :show="enterpriseStaffPinia.listTotal.totalCount > enterpriseStaffPinia.query.pageSize"
                    :total="enterpriseStaffPinia.listTotal.totalCount"
                    :current="enterpriseStaffPinia.currentPage"
                    :onPageNext="enterpriseStaffPinia.onPageNextAction"
                />
            </div>

            <div v-if="enterpriseStaffPinia.uploadDialogVisile" class="dialog-upload">
                <DialogBox_p35
                    title="导入Excel" 
                    sureText="导入"
                    :show="enterpriseStaffPinia.uploadDialogVisile"
                    :isActiveSure="enterpriseStaffPinia.isActiveSure"
                    @onDialogClose="enterpriseStaffPinia.onResetDialogStatusAction(uploadDialog)"
                    :on-sure-event="enterpriseStaffPinia.onUploadEnterpriseStaffExelAction"
                >
                    <div class="upload-container">
                        <div class="upload-container-title">上传Excel文件：</div>
                        <div class="upload-container-content">
                            <el-upload
                                ref="uploadDialog"
                                :limit="1"
                                :on-exceed="handleUploadExceed"
                                :auto-upload="false"
                                :on-change="handleUploadChange"
                                accept=".xlsx, .xls"
                            >
                                <template v-if="!enterpriseStaffPinia.isActiveSure" #trigger>
                                    <div class="text">点此上传Excel文件</div>
                                </template>

                                <template #file>
                                    <div class="upload-ready">
                                        <img src="../../../assets/image/excel.svg" />
                                        <div class="upload-ready-infos">
                                            <div class="name">{{ enterpriseStaffPinia.uploadFile?.name }}</div>
                                            <div class="opt" @click="handleRemoveFile"><el-icon><Close /></el-icon></div>
                                        </div>
                                    </div>
                                </template>
                            </el-upload>
                            
                        </div>
                    </div>
                </DialogBox_p35>
            </div>

            <div v-if="enterpriseStaffPinia.uploadResultVisile">
                <DialogBox_p35
                    :showFooter="false"
                    :show="enterpriseStaffPinia.uploadResultVisile"
                    :show-close="false"
                >
                    <ResultBox
                        :show="enterpriseStaffPinia.uploadResultVisile"
                        :icon="enterpriseStaffPinia.uploadResult?.icon"
                        :title="enterpriseStaffPinia.uploadResult?.title"
                        :sub-title="enterpriseStaffPinia.uploadResult?.subTitle"
                        @on-result-box="enterpriseStaffPinia.onResultBoxAction"
                    />
                </DialogBox_p35>
            </div>

            <div v-if="enterpriseStaffPinia.addStaffVisible">
                <DialogBox_p35
                    title="新增员工"
                    sureText="提交"
                    :show="enterpriseStaffPinia.addStaffVisible"
                    :isActiveSure="enterpriseStaffPinia.isAddStaffActiveSure"
                    @onDialogClose="enterpriseStaffPinia.onResetAddStaffStatusAction"
                    :on-sure-event="enterpriseStaffPinia.onAddStaffAction"
                >
                    <el-form
                        ref="ruleFormRef"
                        :model="enterpriseStaffPinia.addedStaffInfo"
                        :rules="enterpriseStaffPinia.addStaffRules"
                        labelPosition="top"
                    >
                        <el-form-item label="员工名称：" prop="name">
                            <el-input v-model="enterpriseStaffPinia.addedStaffInfo.username" placeholder="请输入" @input="enterpriseStaffPinia.onAddStaffInputAction" clearable />
                        </el-form-item>

                        <el-form-item label="手机号：" prop="mobile">
                            <el-input v-model="enterpriseStaffPinia.addedStaffInfo.mobile" maxlength="11" placeholder="请输入" @input="enterpriseStaffPinia.onAddStaffInputAction" clearable />
                        </el-form-item>
                    </el-form>
                </DialogBox_p35>
            </div>
        </template>
    </Page>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';

import { genFileId } from 'element-plus'
import type { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import useEnterpriseStaffPinia from '@/pinia/enterprise/staff/index'


export default defineComponent({
    name: 'EnterpriseStaffView'
})
</script>

<script lang="ts" setup>
const enterpriseStaffPinia = useEnterpriseStaffPinia()

const uploadDialog = ref<UploadInstance>()

const handleUploadExceed: UploadProps['onExceed'] = (files) => {
    uploadDialog.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadDialog.value!.handleStart(file)

    console.log('handleExceed', uploadDialog.value)
}

const handleUploadChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    console.log('handleUploadChange', uploadFile, uploadFiles)
    enterpriseStaffPinia.onUploadFileChangeAction(uploadFile)
}

const handleRemoveFile = () => {
    enterpriseStaffPinia.onResetDialogStatusAction(uploadDialog, false)
    uploadDialog.value!.clearFiles()
}

onBeforeMount(() => {
    enterpriseStaffPinia.onSearchAction()
})


</script>

<style lang="scss" scoped>
@import '../../../assets/style/colors';

.staff {

    .download-template {
        margin-right: 12px;
        padding: 9px 15px;
        font-size: 14px;
        border: 1px solid rgb(220, 223, 230);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            color: $main-color;
            border-color: $main-color;
        }

        a {
            color: inherit; 
            text-decoration: none; 
        }
    }

    .dialog-upload {

        .upload-container {

            &-title {
                font-size: 14px;
                font-weight: 400;
                color: $title_color_333;
                line-height: 20px;
            }

            &-content {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 8px;
                width: 100%;
                height: 132px;
                border: 1px dotted $content_color_d9d9d9;

                .text {
                    color: $main-color;
                    font-size: 14px;
                    font-weight: 500;
                }
            }

            .upload-ready {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 10px;

                img {
                    width: 48px;
                    height: 48px;
                }

                &-infos {
                    display: flex;
                    align-items: center;
                    margin-top: 10px;

                    .name {
                        font-size: 14px;
                        font-weight: 400;
                        color: $title_color_333;
                    }

                    .opt {
                        display: flex;
                        margin-left: 10px;
                        cursor: pointer;
                        opacity: 0;
                    }
                }

                &:hover {

                    .upload-ready-infos .opt {
                        color: $main-color;
                        opacity: 1;
                    }

                }
            }
        }
    }

    .add-staff {

        &-item {
            margin-bottom: 24px;


            .label {
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 400;
                color: $title_color_333;
            }
        }

    }
}

</style>